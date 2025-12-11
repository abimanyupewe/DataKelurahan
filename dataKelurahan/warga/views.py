from .models import Warga, Pengaduan
from .serializers import WargaSerializer, PengaduanSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.filters import SearchFilter, OrderingFilter

class WargaViewSet(viewsets.ModelViewSet):
    queryset = Warga.objects.all().order_by('-tanggal_registrasi')
    serializer_class = WargaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # default meski tidak mempunyai token masih bisa get data
    # pagination and filter
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nama_lengkap', 'nik', 'alamat']
    ordering_fields = ['nama_lengkap', 'tanggal_registrasi']

class PengaduanViewSet(viewsets.ModelViewSet):
    queryset = Pengaduan.objects.all().order_by('-tanggal_pengaduan')
    serializer_class = PengaduanSerializer
    permission_classes = [IsAdminUser]
    # pagination and filter
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['judul', 'isi', 'status', 'pelapor__nama_lengkap', 'pelapor__nik']
    ordering_fields = ['judul', 'tanggal_pengaduan', 'status']