import jwt from 'jsonwebtoken';


let token = '';
export const jwtHome = (req, res) => {
    token = jwt.sign(
        {username: 'testeur', userId: 5},
        'mySecret',
        {expiresIn: '24h'}
    )

    console.log(token)

    try {
        const verifToken = jwt.verify(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RldXIiLCJ1c2VySWQiOjUsImlhdCI6MTcwMDY2NTY1MSwiZXhwIjoxNzAwNzUyMDUxfQ.3GFLG5EFZg9HD388W9CVGgxqFVDsVNbkjEUADt_00_M\n",
            "mySecret"
        )
        console.log(verifToken)
    } catch (err) {
        console.log(err.message)
    }


    res.send('ok')
}