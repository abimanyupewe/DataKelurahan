from django import forms
from .models import Warga, Pengaduan

class WargaForm(forms.ModelForm):
    class Meta:
        model = Warga
        fields = ['nik', 'nama_lengkap', 'alamat', 'no_telepon']
        widgets = {
            'nik': forms.TextInput(attrs={'placeholder': 'Masukkan NIK'}),
            'nama_lengkap': forms.TextInput(attrs={'placeholder': 'Masukkan nama lengkap'}),
            'alamat': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Masukkan alamat'}),
            'no_telepon': forms.TextInput(attrs={'placeholder': 'Masukkan nomor telepon'}),
        }

class PengaduanForm(forms.ModelForm):
    class Meta:
        model = Pengaduan
        fields = ['judul', 'isi', 'status', 'pelapor']
        widgets = {
            'judul': forms.TextInput(attrs={'placeholder': 'Judul pengaduan'}),
            'isi': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Isi pengaduan'}),
        }