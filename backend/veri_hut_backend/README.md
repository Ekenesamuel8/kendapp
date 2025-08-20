
```markdown
# Veri Hut Backend

This is the **Django REST API** for Veri Hut — powering posts, live streams, clips, and monetization.

---

## ✨ Features
- RESTful API for user-generated content (UGC).  
- Authentication (JWT planned).  
- Post creation: text, image, short video uploads.  
- API to fetch and display posts in the feed.  

---

## 🛠️ Tech Stack
- [Django] 
- [Django REST Framework]
- SQLite (dev) → PostgreSQL (prod)  
- IPFS integration planned for media storage.  

---

## 🚀 Getting Started

```bash
cd backend
cd veri_hut_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
