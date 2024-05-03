export class VeiculoController {
    create (req, res) {
        const {placa, chassi, renavam, modelo, marca, ano} = req.body;
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal Server Error"})
        }
    }
}