const Booking = require('../models/Booking')

module.exports = {
    async store (req, res) {
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        console.log("backend start")

        const booking = await Booking.create({
            user: user_id,  // Usuario que requisitou
            spot: spot_id,  // id do spot requerido
            date
        })

        await booking.populate('user').populate('spot').execPopulate()

        const ownerSocket = req.connectedUsers[booking.spot.user]
        if(ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking)
            console.log("emitido")
        } else {
            console.log("socket não encontrado!")
        }

        return res.json(booking)
    }
}