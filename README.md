# Diabetes Risk Assessment Dashboard

A modern web application for diabetes risk assessment and visualization using the Pima Indians Diabetes Dataset. This tool provides interactive predictions, detailed analytics, and visual insights into diabetes risk factors.


Screenshot 
![image](https://github.com/user-attachments/assets/925781ff-12e6-4c05-aceb-b578ed33e0a2)
![image](https://github.com/user-attachments/assets/aac83ca1-08c0-4bb5-8f92-66cb0be52a32)



## Features

- **Real-time Risk Assessment**: Input patient data and receive instant diabetes risk predictions
- **Interactive Visualizations**: 
  - Correlation heatmaps showing relationships between health metrics
  - Feature importance charts highlighting key risk factors
  - Distribution charts comparing diabetic vs non-diabetic patterns
- **Comprehensive Statistics**: View aggregated statistics and insights from the dataset
- **Educational Information**: Detailed explanations of risk factors and model interpretation

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Navigate to the project directory:
```bash
cd diabetes-risk-dashboard
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and model logic
└── lib/               # Shared utilities and helpers
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Model Information

This application uses the Pima Indians Diabetes Dataset, which contains diagnostic measurements from female patients. The prediction model analyzes various health metrics to estimate diabetes risk.

**Key Features Used:**
- Glucose concentration
- Blood pressure
- Skin thickness
- Insulin level
- BMI (Body Mass Index)
- Diabetes pedigree function
- Age

## Disclaimer

This tool is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers regarding medical conditions.



## Acknowledgments

- Data source: Pima Indians Diabetes Dataset
- UI Components: shadcn/ui
- Visualization Libraries: Recharts
