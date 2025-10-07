from django.urls import path
from .views import WargaListView, WargaDetailView

urlpatterns = [
    path('', WargaListView.as_view(), name='wargaList'),
    path('<int:pk>/', WargaDetailView.as_view(), name='warga_detail')
]