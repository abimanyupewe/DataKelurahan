from django.urls import path
from .views import WargaListView, WargaDetailView, PengaduanListView, WargaCreateView, PengaduanCreateView, WargaUpdateView, WargaDeleteView, PengaduanUpdateView, PengaduanDeleteView, PengaduanDetailView

urlpatterns = [
    path('list_warga/', WargaListView.as_view(), name='warga_list'),
    path('<int:pk>/', WargaDetailView.as_view(), name='warga_detail'),
    path('pengaduan/', PengaduanListView.as_view(), name='pengaduan_list'),
    # path('', PengaduanListView.as_view(), name='pengaduan_list'), 
    path('tambah_warga/', WargaCreateView.as_view(), name='tambah_warga'),
    path('tambah_pengaduan/', PengaduanCreateView.as_view(), name='tambah_pengaduan'),
    # warga
    path('<int:pk>/warga/edit/', WargaUpdateView.as_view(), name='warga_edit'),
    path('<int:pk>/warga/hapus/', WargaDeleteView.as_view(), name='warga_hapus'),
    # pengaduan
    path('<int:pk>/pengaduan/edit/', PengaduanUpdateView.as_view(), name='pengaduan_edit'),
    path('<int:pk>/pengaduan/hapus/', PengaduanDeleteView.as_view(), name='pengaduan_hapus'),
    path('<int:pk>/pengaduan_detail/', PengaduanDetailView.as_view(), name='pengaduan_detail'),
]