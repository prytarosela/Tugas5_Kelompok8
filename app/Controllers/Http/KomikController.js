'use strict'

const Komik = use('App/Models/Komik') // Import model Komik

class KomikController {
  // Menampilkan halaman daftar semua komik
  async index ({ view }) {
    const komiks = await Komik.all() // Ambil semua data komik dari database
    return view.render('komik.index', { komiks: komiks.toJSON() }) // Render ke view dengan data komik
  }
  
  // API untuk mendapatkan semua komik dalam format JSON
  async getAll ({ response }) {
    const komiks = await Komik.all() // Ambil semua data komik
    return response.status(200).json({
      data: komiks // Return data dalam format JSON
    })
  }
  
  // API untuk mendapatkan satu komik berdasarkan ID
  async getOne ({ params, response }) {
    try {
      const komik = await Komik.findOrFail(params.id) // Cari komik berdasarkan ID, error kalau tidak ketemu
      return response.status(200).json({
        data: komik
      })
    } catch (error) {
      return response.status(404).json({ // Kalau tidak ketemu, kirim status 404
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
  
  // Menampilkan form untuk membuat komik baru
  async create ({ view }) {
    return view.render('komik.create') // Render form create komik
  }
  
  // Menyimpan komik baru ke database (bisa dari API atau form biasa)
  async store ({ request, response, session }) {
    const komikData = request.only([
      'judul', 'penulis', 'penerbit', 'tahun_terbit', 
      'sinopsis', 'jumlah_halaman', 'genre' // Ambil hanya field yang diperlukan dari request
    ])
    
    try {
      const komik = await Komik.create(komikData) // Simpan data baru ke database
      
      // Cek tipe response yang diminta, jika JSON (API)
      if (request.accepts(['html', 'json']) === 'json') {
        return response.status(201).json({
          message: 'Komik berhasil ditambahkan',
          data: komik
        })
      }
      
      // Jika request dari form biasa (browser)
      session.flash({ notification: 'Komik berhasil ditambahkan!' })
      return response.redirect('/komik')
    } catch (error) {
      return response.status(400).json({ // Error handling jika gagal create
        message: 'Gagal menambahkan komik',
        error: error.message
      })
    }
  }
  
  // Menampilkan form edit komik
  async edit ({ params, view }) {
    const komik = await Komik.find(params.id) // Cari komik berdasarkan ID (tidak pakai findOrFail, hati-hati kalau data tidak ada)
    return view.render('komik.edit', { komik: komik.toJSON() }) // Render form edit dengan data komik
  }
  
  // Memperbarui data komik (baik dari API atau form browser)
  async update ({ params, request, response, session }) {
    try {
      const komik = await Komik.findOrFail(params.id) // Cari komik, error kalau tidak ketemu
      const komikData = request.only([
        'judul', 'penulis', 'penerbit', 'tahun_terbit', 
        'sinopsis', 'jumlah_halaman', 'genre' // Ambil field yang diperlukan dari request
      ])
      
      komik.merge(komikData) // Gabungkan data baru ke dalam model lama
      await komik.save() // Simpan perubahan ke database
      
      // Cek tipe response yang diminta
      if (request.accepts(['html', 'json']) === 'json') {
        return response.status(200).json({
          message: 'Komik berhasil diperbarui',
          data: komik
        })
      }
      
      // Jika dari browser
      session.flash({ notification: 'Komik berhasil diperbarui!' })
      return response.redirect('/komik')
    } catch (error) {
      return response.status(404).json({ // Jika komik tidak ditemukan
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
  
  // Menghapus komik dari database
  async destroy ({ params, response, session }) {
    try {
      const komik = await Komik.findOrFail(params.id) // Cari komik berdasarkan ID
      await komik.delete() // Hapus dari database
      
      session.flash({ notification: 'Komik berhasil dihapus!' }) // Berikan notifikasi sukses
      return response.redirect('/komik') // Redirect ke daftar komik
    } catch (error) {
      return response.status(404).json({ // Jika komik tidak ditemukan
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
}

module.exports = KomikController // Export controller supaya bisa digunakan di routes
