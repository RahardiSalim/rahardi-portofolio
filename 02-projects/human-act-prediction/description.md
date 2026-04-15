# Human Activity Prediction from Egocentric Video

## Metadata

**Type:** Research Project  
**Date:** October 2025 - January 2026  
**Status:** Completed  
**Institution:** ETH Zürich AI Research

**Technologies:** Python, PyTorch, Computer Vision, Video Understanding, Temporal Modeling, Action Recognition, EgoVLP

**Links:**
- 🔗 GitHub: [Add your repository URL here](https://github.com/yourusername/human-act-prediction)
- 📄 Paper: [Add paper URL here](https://arxiv.org/)
- 📊 Dataset: [Add dataset URL here](https://data.vision.ee.ethz.ch/...)
- 🔬 Related Experience: [ETH Zürich Research](../../01-professional-experience/eth-zurich-ai-research-assistant-2025/description.md)

**Team Size:** [Add team size]  
**Role:** AI Research Assistant - Dataset Curation

---

## Short Description

Egocentric video dataset and activity prediction system achieving sub-second temporal accuracy for human-object interactions, supporting computer vision research in first-person action recognition and anticipation.

## Long Description

This research project at ETH Zürich advanced egocentric video understanding—teaching machines to comprehend human activities from first-person camera perspectives. Applications span augmented reality, assistive robotics, and human-computer interaction.

The core challenge: egocentric video differs fundamentally from third-person footage. Rapid camera movements, partial object visibility, hand-dominant interactions, and temporal dependencies create unique technical difficulties.

**Research Contributions:**

My primary contribution was curating a high-precision dataset of 120+ videos with meticulous temporal annotations. Each video captured complex human-object interaction sequences—cooking tasks, assembly operations, tool usage—requiring frame-level labeling of objects, actions, and state transitions.

The annotation process demanded:
- Sub-second temporal accuracy for action boundaries
- Precise object identification despite motion blur and occlusion  
- Relationship labeling between hands, objects, and environment
- Multi-level hierarchy: atomic actions → activities → tasks

This curated dataset accelerated model training cycles significantly. Clean ground truth enabled rapid experimentation with different architectures—temporal convolutional networks, transformer-based models, and graph neural networks for modeling object relationships.

**Technical Approach:**

The activity prediction pipeline combined:
- Spatial features from ResNet backbone
- Temporal modeling via 3D convolutions
- Hand pose estimation for interaction understanding
- Object detection and tracking across frames
- Action anticipation from partial observations

**Impact:**

High-quality annotated data proved critical. Researchers achieved faster convergence, better generalization, and more reliable benchmarking. The dataset became a valuable resource for the egocentric vision community.

This experience reinforced that in deep learning, data quality often matters more than model sophistication. Careful curation and precise annotation create the foundation for all subsequent research advances.
