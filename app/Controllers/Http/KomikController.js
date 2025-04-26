'use strict'

const Komik = use('App/Models/Komik')

class KomikController {
  // Tampilkan halaman daftar komik
  async index ({ view }) {
    const komiks = await Komik.all()
    return view.render('komik.index', { komiks: komiks.toJSON() })
  }
  
  // API untuk mendapatkan semua komik
  async getAll ({ response }) {
    const komiks = await Komik.all()
    return response.status(200).json({
      data: komiks
    })
  }
  
  // API untuk mendapatkan satu komik berdasarkan ID
  async getOne ({ params, response }) {
    try {
      const komik = await Komik.findOrFail(params.id)
      return response.status(200).json({
        data: komik
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
  
  // Tampilkan form untuk membuat komik baru
  async create ({ view }) {
    return view.render('komik.create')
  }
  
  // API untuk menyimpan komik baru
  async store ({ request, response, session }) {
    const komikData = request.only([
      'judul', 'penulis', 'penerbit', 'tahun_terbit', 
      'sinopsis', 'jumlah_halaman', 'genre'
    ])
    
    try {
      const komik = await Komik.create(komikData)
      
      // Jika request ingin JSON response (dari API)
      if (request.accepts(['html', 'json']) === 'json') {
        return response.status(201).json({
          message: 'Komik berhasil ditambahkan',
          data: komik
        })
      }
      
      // Jika request dari form browser
      session.flash({ notification: 'Komik berhasil ditambahkan!' })
      return response.redirect('/komik')
    } catch (error) {
      return response.status(400).json({
        message: 'Gagal menambahkan komik',
        error: error.message
      })
    }
  }
  
  // Tampilkan form edit komik
  async edit ({ params, view }) {
    const komik = await Komik.find(params.id)
    return view.render('komik.edit', { komik: komik.toJSON() })
  }
  
  // API untuk memperbarui data komik
  async update ({ params, request, response, session }) {
    try {
      const komik = await Komik.findOrFail(params.id)
      const komikData = request.only([
        'judul', 'penulis', 'penerbit', 'tahun_terbit', 
        'sinopsis', 'jumlah_halaman', 'genre'
      ])
      
      komik.merge(komikData)
      await komik.save()
      
      // Jika request ingin JSON response (dari API)
      if (request.accepts(['html', 'json']) === 'json') {
        return response.status(200).json({
          message: 'Komik berhasil diperbarui',
          data: komik
        })
      }
      
      // Jika request dari form browser
      session.flash({ notification: 'Komik berhasil diperbarui!' })
      return response.redirect('/komik')
    } catch (error) {
      return response.status(404).json({
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
  
  // API untuk menghapus komik
  async destroy ({ params, response, session }) {
    try {
      const komik = await Komik.findOrFail(params.id)
      await komik.delete()
      
      session.flash({ notification: 'Komik berhasil dihapus!' })
      return response.redirect('/komik')
    } catch (error) {
      return response.status(404).json({
        message: 'Komik tidak ditemukan',
        id: params.id
      })
    }
  }
}

module.exports = KomikController