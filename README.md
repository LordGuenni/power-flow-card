# Power Flow Card for Home Assistant

<img src="./src/assets/example.gif" alt="Demo" width="720">

A custom Lovelace card for visualizing real-time energy flow between grid, solar, battery, and home.  
Provides a clean, animated interface that makes it easy to understand how power is moving through your system.

---

## Features

- Animated flow lines Plannel: with speed based on actual power values  
- Supports grid import/export, solar generation, battery charge/discharge  
---

## Installation

### **HACS (recommended)**

1. Open **HACS → Frontend**
2. Add a custom repository:  

## Configuration 

Usage example in yaml and UI:

```yaml
type: custom:power-flow-card
name: Home Energy Flow
threshold: 10
entities:

  solar_power: sensor.sn_3015027172_pv_power
  grid_import_power: sensor.sunny_home_manager_2_metering_power_absorbed
  grid_export_power: sensor.sunny_home_manager_2_metering_power_supplied
  ev_charge_power: sensor.evcc_garage_charge_power
  battery_charge_power: sensor.sn_3017444296_battery_power_charge_total
  battery_discharge_power: sensor.sn_3017444296_battery_power_discharge_total
  
solar_descriptor_enabled: true
grid_descriptor_enabled: true
grid_descriptor_label: Grid
battery_descriptor_label: Battery
ev_descriptor_label: EV
battery_descriptor_enabled: false
solar_descriptor_label: Solar
ev_descriptor_enabled: true
home_descriptor_label: Home
home_descriptor_enabled: true
solar_descriptor_entity: sensor.sn_3015027172_daily_yield
ev_descriptor_entity: sensor.sn_3015027172_daily_yield
home_descriptor_entity: sensor.sn_3015027172_daily_yield
grid_descriptor_entity: sensor.sn_3015027172_daily_yield
```

Configuration editor screenshot:

![](./src/assets/config.png)

The Illustrator Base for the SVGs was provided by [ForsakenConversation](https://www.reddit.com/user/ForsakenConversation/)
