# Power Flow Card for Home Assistant

![Power Flow Animation](preview.gif)

---
A custom Lovelace card for visualizing real-time energy flow between grid, solar, battery, and home.  
Provides a clean, animated interface that makes it easy to understand how power is moving through your system.

---

## Features

- **Smooth glowing pulse animation** - Single traveling pulse along each flow line (not blocky dashes)
- **Unit Normalization** - Automatic background conversion for kW, kVA, and W so flow thresholds and animation speeds calculate accurately regardless of your sensors' native units
- **Dynamic animation speed** - Speed adjusts smoothly based on real-time power values (fully configurable)
- **Auto-kW Conversion** - Automatically scales Watts to kW (and Wh to kWh / Wp to kWp) when exceeding a configurable threshold (e.g. 1000 W)
- **Smart Dynamic Decimals** - Unit-aware precision scaling (`decimals_w`, `decimals_kw`, and fallback `decimals`)
- **Theme Awareness & Custom Theming** - Native Light and Dark mode support with configurable house and roof colors
- **Dynamic Typography & Icon Alignment** - Configurable primary and secondary font sizes with browser-compliant XHTML icon rendering
- **Dynamic Battery Icons** - Material Design battery icons dynamically reflect current SOC percentage (e.g., `mdi:battery-70`)
- **Primary & Secondary Descriptors** - Display multiple metrics per component (e.g., real-time power + daily yield, SOC %, or cost). Click on primary sensor to open history.
- **Single-Entity & Reversible Flow Support** - Direction and animation handle positive/negative flows seamlessly, with optional manual battery flow inversion
- **High-Resolution Vector Graphics** - Upgraded 2375x1584 base graphics with precision-aligned animated powerlines
- **Fully configurable via Home Assistant UI** - Visual Editor GUI with expandable setting sections

---

## Changelog

### Core Logic & Engine Updates
* **Added Unit Normalization:** Introduced background conversion for kW/kVA to W, ensuring flow thresholds and animation speeds calculate accurately regardless of a sensor's native unit.
* **Fixed Initialization Bug:** Resolved the "Custom element doesn't exist" race condition by deferring flow math execution until the Home Assistant configuration object is fully loaded.
* **Improved Negative Value Handling:** Corrected flow reversal logic to properly trigger animations for absolute negative values while maintaining the correct directional behavior for battery and grid flows.

### Value Formatting & Units
* **Added Auto-kW Conversion:** Introduced an `auto_kw_threshold` setting to automatically convert high Watt/Wh values into kW/kWh, improving dashboard readability during peak loads (e.g., EV charging).
* **Added Dynamic Decimals:** Replaced rigid per-item decimal settings with a global, unit-aware scaling system (`decimals_w`, `decimals_kw`, and a fallback `decimals`), automatically adjusting visual precision as units dynamically change.
* **Added Currency Formatting:** Implemented strict currency formatting overrides to ensure currency consistently display with exactly two decimal places.

### UI, Theming & Typography
* **Added Theme Awareness:** Implemented native Light and Dark mode theme support, automatically adjusting graphic fill colors, background opacities, and line strokes for optimal contrast.
* **Added Custom Color Controls:** Added Visual Editor GUI fields (`house_color_dark`, `roof_color_light`, etc.) to allow for complete manual overrides of the default house and roof colors.
* **Added Dynamic Typography:** Introduced `primary_font_size` and `secondary_font_size` variables that automatically calculate and control text sizes, vertical line spacing, and icon scaling.
* **Fixed Icon Alignment:** Replaced standard `<ha-icon>` rendering with an XHTML `<foreignObject>` wrapper, guaranteeing flawless vertical alignment alongside text across all modern browsers.
* **Added Dynamic Battery Icons:** Implemented dynamic battery icon generation that rounds the current percentage and maps to the correct incremental Material Design icon (e.g., `mdi:battery-70`).

### Graphics & Assets
* **Updated Base Assets:** Upgraded base SVG graphics to a new 2375x1584 viewport.
* **Realigned Powerlines:** Calculated and injected precise updated vector coordinates for the EV and Battery animated powerlines to align perfectly with the revised layout.

---

## Installation

### **HACS (recommended)**

1. Open **HACS → Frontend**
2. Click the top right menu and select **Custom repositories**
3. Add `https://github.com/LordGuenni/power-flow-card` with category **Dashboard** / **Lovelace**
4. Click **Install**

---

## Configuration 

### Minimal Configuration

The **only required** field is `entities`. All other options have sensible defaults:

```yaml
type: custom:power-flow-card
entities:
  solar_power: sensor.solar_power
  grid_import_power: sensor.grid_import
```

This will give you:
- Smooth animated flow lines with unit normalization (W / kW / kVA)
- Dynamic speed enabled (100W–10000W → 5s–1s)
- Threshold: 10W
- Default card title: "Power Flow Diagram"

### Complete Example

```yaml
type: custom:power-flow-card
name: Home Energy Flow
threshold: 10
invert_battery_flow: false

# Typography Settings
primary_font_size: 34
secondary_font_size: 28

# Value Formatting
auto_kw_threshold: 1000
decimals_w: 0
decimals_kw: 2

# Power entities
entities:
  solar_power: sensor.sn_3015027172_pv_power
  grid_import_power: sensor.sunny_home_manager_2_metering_power_absorbed
  grid_export_power: sensor.sunny_home_manager_2_metering_power_supplied
  ev_charge_power: sensor.evcc_garage_charge_power
  battery_charge_power: sensor.sn_3017444296_battery_power_charge_total
  battery_discharge_power: sensor.sn_3017444296_battery_power_discharge_total

# Animation speed settings  
dynamic_speed_enabled: true
min_flow_speed: 5
max_flow_speed: 1
min_power_threshold: 100
max_power_threshold: 10000

# Custom House & Roof Colors (Optional)
house_color_dark: "#4a5976"
roof_color_dark: "#3b465e"
house_color_light: "#dce1e8"
roof_color_light: "#c8d0db"

# Line colors (Optional)
solar_line_color: "#ffd54f"
grid_import_line_color: "#4fc3f7"
grid_export_line_color: "#66bb6a"
battery_charge_line_color: "#64b5f6"
battery_discharge_line_color: "#29b6f6"
ev_line_color: "#26c6da"

# Descriptors with Primary & Secondary Entities
solar_descriptor_enabled: true
solar_descriptor_label: Solar
solar_descriptor_entity: sensor.sn_3015027172_pv_power
solar_secondary_entity: sensor.sn_3015027172_daily_yield
solar_secondary_icon: mdi:solar-power

grid_descriptor_enabled: true
grid_descriptor_label: Grid
grid_descriptor_entity: sensor.sunny_home_manager_2_metering_power_absorbed
grid_secondary_entity: sensor.daily_grid_cost
grid_secondary_icon: mdi:currency-gbp

battery_descriptor_enabled: true
battery_descriptor_label: Battery
battery_descriptor_entity: sensor.sn_3017444296_battery_power_charge_total
battery_secondary_entity: sensor.battery_soc
battery_secondary_icon: mdi:battery

ev_descriptor_enabled: true
ev_descriptor_label: EV Charger
ev_descriptor_entity: sensor.evcc_garage_charge_power
ev_secondary_entity: sensor.ev_battery_soc
ev_secondary_icon: mdi:car-electric

home_descriptor_enabled: true
home_descriptor_label: Home
home_descriptor_entity: sensor.daily_consumption
```

---

### UI Configuration

All settings can be configured through the Home Assistant Visual Editor GUI:

1. Click the three dots on the card → **Edit**
2. Configure **Entities** (solar, grid, battery, EV power sensors)
3. Expand **Typography Settings** to adjust primary and secondary font sizes
4. Expand **Animation Speed Settings** to adjust min/max speeds and thresholds
5. Expand **Global Value Formatting (Fallback)** to set auto-kW threshold and decimal rules
6. Expand **House Graphic Colors** or **Line Colors** to customize appearance
7. Expand component descriptors (Solar, Grid, Battery, EV, Home) to configure primary and secondary values and icons

![Configuration Editor](./src/assets/config.png)

---

### Configuration Reference

| Option | Required | Default | Description |
|---|---|---|---|
| `entities` | ✅ Yes | - | Power sensor entities object |
| `name` | ❌ No | "Power Flow Diagram" | Card title header |
| `threshold` | ❌ No | `10` | Active flow threshold in Watts |
| `invert_battery_flow` | ❌ No | `false` | Invert direction of battery flow line |
| `primary_font_size` | ❌ No | `34` | Primary font size in px |
| `secondary_font_size` | ❌ No | `28` | Secondary / label font size in px |
| `dynamic_speed_enabled` | ❌ No | `true` | Enable power-scaled animation speed |
| `min_flow_speed` | ❌ No | `5` | Animation duration at lowest power (seconds) |
| `max_flow_speed` | ❌ No | `1` | Animation duration at highest power (seconds) |
| `min_power_threshold` | ❌ No | `100` | Power (W) at slowest animation speed |
| `max_power_threshold` | ❌ No | `10000` | Power (W) at fastest animation speed |
| `auto_kw_threshold` | ❌ No | - | Auto convert W to kW when absolute power ≥ threshold |
| `decimals_w` | ❌ No | `0` | Decimal precision for Watt / Wh / Wp values |
| `decimals_kw` | ❌ No | `2` | Decimal precision for kW / kWh / kWp values |
| `decimals` | ❌ No | - | Fallback decimal precision |
| `display_unit` | ❌ No | - | Global display unit override |
| `unit_multiplier` | ❌ No | - | Global multiplier factor |
| `house_color_dark` | ❌ No | `#4a5976` | House graphic fill color in dark mode |
| `roof_color_dark` | ❌ No | `#3b465e` | Roof graphic fill color in dark mode |
| `house_color_light` | ❌ No | `#dce1e8` | House graphic fill color in light mode |
| `roof_color_light` | ❌ No | `#c8d0db` | Roof graphic fill color in light mode |
| `solar_line_color` | ❌ No | Theme/default | Solar flow line CSS color |
| `grid_import_line_color` | ❌ No | Theme/default | Grid import flow line CSS color |
| `grid_export_line_color` | ❌ No | Theme/default | Grid export flow line CSS color |
| `battery_charge_line_color` | ❌ No | Theme/default | Battery charge flow line CSS color |
| `battery_discharge_line_color` | ❌ No | Theme/default | Battery discharge flow line CSS color |
| `ev_line_color` | ❌ No | Theme/default | EV flow line CSS color |
| `*_descriptor_enabled` | ❌ No | `false` | Enable descriptor for component |
| `*_descriptor_label` | ❌ No | - | Label text displayed under descriptor |
| `*_descriptor_entity` | ❌ No | - | Primary entity ID (e.g. power sensor) |
| `*_display_unit` | ❌ No | - | Primary entity display unit override |
| `*_unit_multiplier` | ❌ No | - | Primary entity multiplier override |
| `*_secondary_entity` | ❌ No | - | Secondary entity ID (e.g. SOC % or daily kWh) |
| `*_secondary_icon` | ❌ No | - | Secondary icon (e.g. `mdi:battery`, `mdi:car-electric`) |
| `*_secondary_display_unit` | ❌ No | - | Secondary entity display unit override |
| `*_secondary_unit_multiplier` | ❌ No | - | Secondary entity multiplier override |

---

## Local Testing

A Docker-based testing environment is included for development:

```bash
# Start the test server
docker compose up --build

# Open in browser
http://localhost:8080/test.html
```

The test page includes:
- Mock Home Assistant environment with Light/Dark mode toggling
- Power value and entity state controls (including SOC %, currency, and yield)
- Live animation speed, typography, and color configuration
- Auto-demo mode for testing dynamic scenarios

---

## Credits

The Illustrator Base for the SVGs was provided by [ForsakenConversation](https://www.reddit.com/user/ForsakenConversation/)