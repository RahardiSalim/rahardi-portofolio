# Data Engineer Intern at Simian Group

## Short Description

Engineered automated file-parsing toolkit supporting 15+ formats with PII detection, reducing manual data preparation time by 30% through NLP-powered classification workflows.

## Long Description

My first internship at Simian Group threw me into the deep end of data engineering challenges. The core problem was deceptively simple: how do you automatically parse and extract sensitive information from documents that come in every conceivable format, at terabyte scale, while maintaining strict privacy and security standards?

I prototyped an automated file-parsing toolkit that became the foundation for the team's data processing workflows. Supporting over 15 formats—CSV, PDF, JSON, XML, DOCX, and various image types—it reduced manual preparation time by 30% in simulations. But format support alone wasn't enough; the real value came from intelligent processing.

The breakthrough was integrating PII detection workflows directly into the parsing pipeline. I engineered a prototype leveraging NLP techniques, specifically Named Entity Recognition (NER) combined with large language models, to identify and classify personally identifiable information. The system generated structured JSON outputs, improving classification reliability by 15% during testing phases.

Working with production-scale data meant confronting real engineering trade-offs. I evaluated performance across Pandas, Polars, Dask, and Spark, benchmarking execution time and memory usage for datasets exceeding 1TB. These experiments informed critical architectural decisions about when to reach for distributed computing versus when single-machine optimization sufficed.

The culmination was designing a prototype end-to-end pipeline for terabyte-scale workloads, combining OCR for image-based documents, multi-format file processing, and NLP-powered extraction. This served as the baseline architecture for sensitive data extraction workflows, demonstrating how thoughtful engineering could make previously manual processes both automated and auditable.

This internship taught me that data engineering isn't just about moving bytes—it's about building reliable, scalable systems that handle the messy reality of diverse data sources while maintaining the security and privacy guarantees that production systems demand.
