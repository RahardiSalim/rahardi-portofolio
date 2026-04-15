# 2nd Place - GEMASTIK 2025 Data Mining Division (National Competition)

## Metadata

**Competition:** GEMASTIK XVII - Data Mining Division  
**Date:** November 2025  
**Award:** 🥈 2nd Place (Silver) - National  
**Scope:** 220 Indonesian Universities  

**Links:**
- 📋 Project Details: [Poverty Prediction Full Project](../../02-projects/poverty-prediction-geospatial-ml/description.md)
- 📄 Certificate: [View Certificate](media/certificates/)
- 📸 Event Photos: [View Photos](media/photos/)
- 📊 Presentation: [View Slides](artifacts/ppt/)
- 👨‍💻 Code: [View Source](artifacts/code/)
- 📝 Paper: [View Proposal](artifacts/proposal/)

---

## Short Description

Silver medal out of 220 Indonesian universities with R² of 0.593 in poverty prediction using hybrid slow learner with LoRA, reducing catastrophic forgetting by 81.5% through geospatial ML and multi-proxy learning.

## Long Description

GEMASTIK represents Indonesia's most prestigious national student competition in technology. Securing second place in the Data Mining division among 220 universities meant competing against the country's best computer science talent. The challenge demanded both research rigor and engineering excellence.

Our project tackled poverty prediction using geospatial machine learning—applying computer vision and satellite imagery analysis to estimate economic conditions. Traditional poverty measurement relies on surveys, which are expensive, time-consuming, and quickly outdated. Could we leverage freely available satellite data to create continuous, scalable poverty indicators?

The technical foundation combined multiple satellite-derived proxies: Nighttime Light (NTL) intensity indicating economic activity, Normalized Difference Vegetation Index (NDVI) capturing agricultural productivity, and Land Surface Temperature (LST) reflecting urban development patterns. Each proxy offers clues about economic conditions, but the real challenge was integrating them coherently.

Our breakthrough was implementing a hybrid slow learner architecture combining LoRA (Low-Rank Adaptation) with Symmetric Cross-Entropy for multi-task learning across NTL, NDVI, and LST tasks. The result: we reduced catastrophic forgetting by 81.5% compared to baseline approaches, enabling stable learning across multiple proxy tasks simultaneously.

We aggregated Sentinel-2 visual features with geospatial data using LightGBM, achieving an R² of 0.593 in poverty prediction. This outperformed baseline approaches by 3.9 to 10.4 points—statistically significant improvements that demonstrated the value of our architectural choices.

But GEMASTIK's Data Mining division included multiple challenges. In addition to poverty prediction, we built an Aksara Jawa (Javanese script) OCR system in just 5 hours during the finals. Under intense time pressure, we achieved 98.8% accuracy, demonstrating rapid computer vision prototyping skills and the ability to adapt techniques across different problem domains.

The competition format tested not just technical depth but breadth. Success required understanding both classical machine learning (geospatial feature engineering, ensemble methods) and modern deep learning (LoRA adaptation, multi-task learning). It required research skills (literature review, experimental design) and engineering pragmatism (working under time constraints, debugging live).

This silver medal validated countless hours of experimentation. More importantly, it demonstrated that combining domain knowledge (geospatial poverty indicators) with cutting-edge techniques (hybrid slow learners) could advance both academic understanding and practical capabilities for social good applications.
