# Body Sandbox - Interactive 3D Human Body

**Body Sandbox** is an interactive web application for visualizing and exploring a 3D human body model with real-time health parameter simulation. Adjust age, body fat, blood sugar, blood pressure, and stress to see their effects on the body, vital signs, and health risk indicators.

## Features

- **3D Human Body Visualization**  
  Interactive 3D model using [three.js](https://threejs.org/). Supports OBJ loading and a fallback procedural model.

- **Health Parameter Controls**  
  Sliders for age, body fat, blood sugar, blood pressure, and stress. Preset buttons for common health scenarios.

- **Vital Signs & Health Assessment**  
  Real-time calculation and display of heart rate, blood pressure, oxygen saturation, BMI, and overall health score.

- **Risk Indicators**  
  Visual risk levels for cardiovascular, diabetes, and obesity based on current parameters.

- **Charts**  
  Live-updating charts for heart rate trend, blood pressure, and system health using [Chart.js](https://www.chartjs.org/).

- **Export Data**  
  Download your current health assessment as a JSON file.

- **Wireframe & Reset View**  
  Toggle wireframe mode and reset the 3D view.

- **Organ Tooltips**  
  Hover over body parts to see system and health impact.

## Getting Started

1. **Clone or Download** this repository.

2. **Place a 3D Model (Optional):**  
   If you have a `FinalBaseMesh.obj` file, place it in the same directory as `body_sandbox_improved.html`. Otherwise, a fallback model will be used.

3. **Open `body_sandbox_improved.html` in your browser.**  
   No build or server required—everything runs client-side.

## File Structure

- [`body_sandbox_improved.html`](body_sandbox_improved.html): Main HTML file containing all code, styles, and logic.

## Dependencies

- [three.js](https://threejs.org/) (via CDN)
- [Chart.js](https://www.chartjs.org/) (via CDN)
- Google Fonts (Poppins)

## Screenshots

![Screenshot](screenshot.png) <!-- Add a screenshot if available -->

## License

This project is for educational and demonstration purposes.

---

**Enjoy exploring
