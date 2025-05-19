import Account from '../models/account.js'

export const create = (req, res) => {
    const account = new Account(req.body);
    account.save(( err, acc ) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                error: "Thêm tài khoản công"
            })
        }
        res.json(acc)
    } )
}