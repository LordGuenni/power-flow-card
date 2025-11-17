import {
    LitElement,
    html,
    css
} from 'https://unpkg.com/lit?module';

class PowerFlowCard extends LitElement {
    // 1. Define component properties
    static get properties() {
        return {
            hass: {
                type: Object
            }, // Home Assistant object (for state)
            config: {
                type: Object
            } // User configuration (entities)
        };
    }

    // 2. Constructor & Initial Setup
    constructor() {
        super();
        this.svgPaths = {
            primary: '/local/assets/grid_line.svg',
            out: '/local/assets/grid_out.svg',
            solar: '/local/assets/solar_line.svg',
            battery: '/local/assets/home_battery.svg',
            ev: '/local/assets/ev_line.svg',
            bg: '/local/assets/home.svg'
        };

        // ---
        // This 'lineConfig' array is the only section that has been changed.
        // ---
        this.lineConfig = [
            { id: 'solar', type: 'solar', entity_key: 'solar_power', reverse: true, container: 'solar' },
            { id: 'battery', type: 'bat-charge', entity_key: 'battery_charge_power', reverse: false, container: 'battery', pathKey: 'battery' },
            { id: 'ev', type: 'ev', entity_key: 'ev_charge_power', reverse: false, container: 'ev' },
            { id: 'grid-import', type: 'grid-import', entity_key: 'grid_import_power', reverse: true, container: 'primary', pathKey: 'primary' },
            { id: 'grid-export', type: 'grid-export', entity_key: 'grid_export_power', reverse: false, container: 'out', pathKey: 'out' },
            
            { id: 'bg', type: 'bg', pathKey: 'bg', isBackground: true, container: 'bg' }
        ];
        
        this.isInitialized = false;
    }

    // 3. Lit Lifecycle Hook: Called once when component is first connected.
    firstUpdated() {
        // Map DOM containers once the render() function has run.
        this.lineContainers = {
            bg: this.shadowRoot.getElementById('svg-container-bg'),
            solar: this.shadowRoot.getElementById('svg-container-solar'),
            battery: this.shadowRoot.getElementById('svg-container-battery'),
            ev: this.shadowRoot.getElementById('svg-container-ev'),
            primary: this.shadowRoot.getElementById('svg-container-primary'),
            out: this.shadowRoot.getElementById('svg-container-out')
        };
        this.loadAllSVGs();
        this.isInitialized = true;
    }

    // 4. HA Lifecycle Hook: Called whenever the state changes.
    set hass(hass) {
        this._hass = hass;
        // Only run flow updates after SVGs have been loaded and mapped.
        if (this.isInitialized) {
            this.updateFlow();
        }
    }

    // --- Core SVG Loading & Processing ---

    ensureGlow(svgEl) {
        if (!svgEl.querySelector('#glow')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = `
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
            svgEl.insertBefore(defs, svgEl.firstChild);
        }
    }

    processSVGString(text, containerEl, lineType) {
        containerEl.innerHTML = text;
        const svgEl = containerEl.querySelector('svg');
        if (!svgEl) return;

        this.ensureGlow(svgEl);

        const colorMap = {
            'solar': 'gold',
            'grid-import': 'dodgerblue',
            'grid-export': 'limegreen', // <-- Needs 'grid-export' (dash)
            'bat-charge': 'cornflowerblue',
            'ev': 'deepskyblue'
        };

        const desiredColor = colorMap[lineType] || 'red';

        svgEl.querySelectorAll('path, circle, rect, line, polyline, polygon').forEach(el => {
            if (el.nodeName === 'rect') { return; }
            el.classList.add('anim-line', lineType);
            el.setAttribute('stroke', desiredColor);
            el.style.setProperty('stroke', desiredColor, 'important');
            el.classList.add('flow-off');
        });
    }

    async loadSVG(path, containerEl, lineType, isBackground) {
        try {
            if (!path) throw new Error(`No SVG path provided for ${lineType}`);
            
            const response = await fetch(path);
            if (!response.ok) throw new Error(`SVG load failed: ${response.status} ${response.statusText}`);
            
            const text = await response.text();
    
            if (isBackground) {
                containerEl.innerHTML = text;
            } else {
                this.processSVGString(text, containerEl, lineType);
            }
        } catch (err) {
            console.error(`Failed to load SVG for "${lineType}" from path "${path}":`, err);
            
            containerEl.innerHTML = `
                <p style="color:#f99; text-align:center; font-weight:bold;">
                    Error loading ${lineType} SVG
                </p>
            `;
    
            throw new Error(`SVG load failed for "${lineType}": ${err.message}`);
        }
    }

    loadAllSVGs() {
        this.lineConfig.forEach(cfg => {
            const pathKey = cfg.pathKey || cfg.type;
            const path = this.svgPaths[pathKey];
            
            const containerId = cfg.container || cfg.id;
            const container = this.lineContainers[containerId];
            
            if (path && container) {
                this.loadSVG(path, container, cfg.type, cfg.isBackground);
            }
        });
    }

    // --- Flow Control Logic ---

    updateFlow() {
        this.lineConfig.filter(c => c.entity_key).forEach(cfg => {
            const container = this.lineContainers[cfg.container || cfg.id];
            
            // Get the entity ID from the user config
            const entityId = this.config.entities[cfg.entity_key];
            const stateObj = entityId ? this._hass.states[entityId] : null;
            
            // Get value, default to 0 if unavailable
            const value = stateObj ? parseFloat(stateObj.state) : 0;
            
            if (container) {
                const lines = container.querySelectorAll('.anim-line');
                const isActive = Math.abs(value) > 10; // 10W threshold
                
                lines.forEach(line => {
                    line.classList.toggle('flow-active', isActive);
                    line.classList.toggle('flow-off', !isActive);
                    line.classList.toggle('reverse-flow', !!cfg.reverse);
                    // -----------------------------
                });
            }
        });
    }

    // 5. User Configuration: Defines which entities to use
    setConfig(config) {
        if (!config.entities || Object.keys(config.entities).length === 0) {
            throw new Error('You need to define entities for the power flow diagram.');
        }
        this.config = config;
    }

    // 6. CSS Styling (in Lit, this is isolated and efficient)
    static get styles() {
        return css `
            /* Card Container Setup */
            :host {
                display: block;
            }
            #svg-overlay {
                position: relative;
                width: 100%;
                height: 500px;
                pointer-events: none;
                padding: 16px;
                box-sizing: border-box;
            }
            #svg-overlay > div {
                position: absolute;
                inset: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            /* Background Styling */
            #svg-container-bg svg {
                opacity: 0.5;
            }

            /* Animated Line Styles */
            .anim-line {
                stroke-dasharray: 20 15;
                animation: dash-move 6s linear infinite, pulse 5s ease-in-out infinite alternate;
                filter: url(#glow);
                stroke-width: 5px;
                --dash-dir: -200; 
            }

            .reverse-flow {
                --dash-dir: 200; 
            }

            /* Animation State Controls */
            .flow-active { animation-play-state: running !important; opacity: 1 !important; }
            .flow-off { animation-play-state: paused !important; opacity: 0.15 !important; }

            @keyframes dash-move {
                to { stroke-dashoffset: var(--dash-dir); }
            }

            @keyframes pulse {
                0%   { stroke-opacity: 0.6; filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
                50%  { stroke-opacity: 1; filter: drop-shadow(0 0 12px rgba(255,255,255,0.3)); }
                100% { stroke-opacity: 0.6; filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
            }
            
            /* Color definitions (these apply classes to the SVG paths) */
            .solar       { stroke: gold !important; }
            .grid-import { stroke: dodgerblue !important; }
            .grid-export { stroke: limegreen !important; } /* <-- Needs 'grid-export' (dash) */
            .ev          { stroke: deepskyblue !important; }
            .bat-charge  { stroke: cornflowerblue !important; }
        `;
    }

    // 7. HTML Template (The card structure)
    render() {
        return html `
            <ha-card header="${this.config.name || 'Power Flow Diagram'}">
                <div id="svg-overlay">
                    <div id="svg-container-bg"></div>
                    <div id="svg-container-solar"></div> 
                    <div id="svg-container-battery"></div> 
                    <div id="svg-container-ev"></div>
                    <div id="svg-container-primary"></div> 
                    <div id="svg-container-out"></div> 
                </div>
            </ha-card>
        `;
    }
}

customElements.define('power-flow-card', PowerFlowCard);