from django.contrib import admin
from .models import Pengaduan, Warga
from unfold.admin import ModelAdmin
    
class WargaAdmin(ModelAdmin):
    list_display = ('nik', 'nama_lengkap', 'no_telepon', 'tanggal_registrasi')
    search_fields = ('nik', 'nama_lengkap', 'no_telepon')

class PengaduanAdmin(ModelAdmin):
    list_display = ('judul', 'status', 'tanggal_pengaduan', 'pelapor')
    list_filter = ('status', 'tanggal_pengaduan')
    search_fields = ('judul', 'isi', 'pelapor__nama_lengkap', 'pelapor__nik')

admin.site.register(Warga, WargaAdmin)
admin.site.register(Pengaduan, PengaduanAdmin)