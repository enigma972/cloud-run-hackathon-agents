
# 🤖 Agent Builder: Custom LLM Chatbot Platform on Cloud Run

## 🏆 Cloud Run Hackathon Category: 🤝 AI Agents

Welcome to **Agent Builder**, a serverless and multi-agent solution designed to enable businesses to deploy ultra-personalized AI assistants capable of answering accurately based on their proprietary documents and knowledge bases.

This project demonstrates the use of the **Google Agent Development Kit (ADK)** and the **Cloud Run** architecture for a fully scalable RAG (Retrieval Augmented Generation) pipeline.

## ✨ Key MVP Features

### 1. Multi-Agent Architecture (ADK Compliant)

The core of the system is a two-agent architecture running within the same **Cloud Run Service** container, ensuring efficiency and speed:

-   **Agent 1: The Orchestrator (The Brain):** Manages the conversation flow, determines user intent, and delegates the context retrieval task to Agent 2. It then prepares the final prompt for response generation by Gemini.
    
-   **Agent 2: The Retrieval Agent (The RAG Engine):** Specialized in vector search. It takes the query from Agent 1, queries the Vector Search database, and returns the relevant context.
    

### 2. Serverless Data Ingestion

The chatbot's "training" is fully automated and decoupled from the main application:

-   Administrators upload their documents (PDF/TXT) via the Admin Dashboard.
    
-   The upload to **Google Cloud Storage (GCS)** triggers an asynchronous **Cloud Run Job**.
    
-   This Job performs document chunking, generates embeddings via the **Gemini Embeddings API**, and stores them in **Cloud Vector Search**.
    

### 3. User Experience

-   **Admin Dashboard:** Simple interface (hosted on **Firebase Hosting**) to manage bots and upload data sources.
    
-   **Web Widget:** A lightweight and embeddable JavaScript script, also hosted on **Firebase Hosting**, allowing end-users to ask questions directly on any website.
    

## 🛠️ Technical Stack

| Component              | Google Cloud Technology         | Role                                                                 |
| :--------------------- | :------------------------------ | :------------------------------------------------------------------- |
| **Cloud Run Service**  | Cloud Run                       | Hosts the Orchestrator Agent and the Retrieval Agent (ADK/Python).   |
| **AI Engine**          | Gemini API                      | Used for response generation (RAG) and embedding creation.           |
| **Ingestion Pipeline** | Cloud Run Job                   | Asynchronous task for preprocessing and vector storage.              |
| **Vector Search**      | Cloud Vector Search (Vertex AI) | Database for RAG embeddings.                                         |
| **Database**           | Cloud Firestore                 | Storage for bot metadata and configurations.                         |
| **Frontend/Hosting**   | Firebase Hosting & Auth         | Hosts the Admin Dashboard and Widget. Provides Admin authentication. |
| **File Storage**       | Google Cloud Storage (GCS)      | Secure storage for raw uploaded documents.                           |


## 🔗 Quick Start

1.  **Clone** this repository.
    
2.  **Configure** your Google Cloud/Firebase environment variables.
    
3.  **Deploy** the three workloads:
    
    -   `backend-chat-api` to a **Cloud Run Service**.
        
    -   `backend-ingestion-job` to a **Cloud Run Job**.
        
    -   `frontend-admin` to **Firebase Hosting**.
        

We are excited to showcase how serverless multi-agent architecture can transform customer support.