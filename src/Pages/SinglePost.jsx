import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIClient } from "@/api";

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await APIClient.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        alert("Failed to load post details");
      }
    };

    fetchPost();
  }, [postId]);

  const handleBack = () => {
    navigate("/posts");
  };

  if (!post) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-gradient-primary">
        <div className="text-center text-white">
          <div className="spinner-border text-white" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 fs-5 fw-light">جاري تحميل تفاصيل المنشور...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-gradient-primary">
      {/* Header with back button */}
      <div className="bg-white/10 backdrop-blur-sm border-bottom border-white/20">
        <div className="container py-4">
          <div className="d-flex align-items-center justify-content-between">
            <button 
              className="btn btn-light btn-lg d-flex align-items-center gap-3 px-4 py-3 rounded-pill shadow-sm hover-lift" 
              onClick={handleBack}
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="bi bi-arrow-left fs-5"></i>
              <span className="fw-semibold">العودة للمنشورات</span>
            </button>
            <div className="text-white">
              <i className="bi bi-file-text fs-1 opacity-75"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            {/* Post header */}
            <div className="bg-white rounded-4 shadow-lg p-5 mb-5 border-0">
              <div className="text-center mb-4">
                <div className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-file-earmark-text text-white fs-1"></i>
                </div>
                <h1 className="display-5 fw-bold text-dark mb-3 lh-sm">{post.title}</h1>
                <div className="d-flex align-items-center justify-content-center text-muted mb-4">
                  <i className="bi bi-calendar3 me-2 text-primary"></i>
                  <span className="fw-medium">تم النشر في {new Date().toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
              
              <div className="bg-gradient-light rounded-4 p-4 border-start border-primary border-4">
                <p className="mb-0 text-dark fs-5 lh-base fw-medium">{post.content}</p>
              </div>
            </div>

            {/* Sections */}
            {post.sections && post.sections.length > 0 ? (
              <div className="bg-white rounded-4 shadow-lg p-5 border-0">
                <div className="text-center mb-5">
                  <h3 className="fw-bold text-dark mb-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-collection me-3 text-primary fs-1"></i>
                    <span>الأقسام</span>
                  </h3>
                  <p className="text-muted fs-6">استكشف محتوى المنشور من خلال أقسامه المختلفة</p>
                </div>
                
                <div className="row g-4">
                  {post.sections.map((section, index) => (
                    <div key={index} className="col-12">
                      <div className="bg-gradient-light rounded-4 p-4 border border-light shadow-sm hover-lift" 
                           style={{ transition: 'all 0.3s ease' }}>
                        <div className="d-flex align-items-start gap-3">
                          <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                               style={{ width: '50px', height: '50px' }}>
                            <span className="text-white fw-bold fs-6">{index + 1}</span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-bold text-dark mb-3 fs-5">
                              {section.title}
                            </h4>
                            <p className="text-muted lh-base mb-0 fs-6">
                              {section.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-4 shadow-lg p-5 text-center border-0">
                <div className="bg-light bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                     style={{ width: '120px', height: '120px' }}>
                  <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="text-muted mb-3 fw-semibold">لا توجد أقسام متاحة</h4>
                <p className="text-muted fs-6 mb-0">هذا المنشور لا يحتوي على أي أقسام بعد.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bg-gradient-light {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}
