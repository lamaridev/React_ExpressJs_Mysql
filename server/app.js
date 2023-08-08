const express = require('express')
const app = express()
const mysql = require('mysql')
const cookie = require( 'cookie-parser')
const bcryptjs = require( 'bcryptjs')
const cors = require( 'cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const e = require('express')

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
    credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

app.use(morgan('dev'))
const db =mysql.createConnection({
    localhost:"127.0.0.1",
    database:"react_node",
    password:"",
    user:"root"
})
db.connect((err)=>
{
    if(err)
    {
        console.error('-- STOP --Erreur de connexion à la base de données :')
    }
    else
    {
        console.log('-- SUCCESS --Connexion à la base de données réussie !');
    }
})


// app.post('/signup', (req, res) => {
//     db.query('SELECT * FROM login WHERE email = ?', req.body.email, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: 'Database query error' });
//         } else {
//             if (result.length > 0) {
//                 res.json({ error: 'Email already exists' });
//             } else {
//                 bcryptjs.hash(req.body.password, 10, (hashErr, hash) => {
//                     if (hashErr) {
//                         res.status(500).json({ error: 'Error during password hashing' });
//                     } else {
//                         const values = [
//                             req.body.name, req.body.email, hash
//                         ];
//                         db.query('INSERT INTO login (name, email, password) VALUES (?, ?, ?)',
//                             values,
//                             (insertErr, insertResult) => {
//                                 if (insertErr) {
//                                     res.status(500).json({ error: 'Database insertion error' });
//                                 } else {
//                                     res.json({ status: 'success' });
//                                 }
//                             }
//                         );
//                     }
//                 });
//             }
//         }
//     });
// });    


app.post('/signup',(req,res)=>
{    
    db.query('select * from login where email=?',[req.body.email],(err,result)=>
    {
        if(err)
        {
            res.json('erreur de requette')
        }
        else
        {
            if(result.length>0)
            {
                res.json('email existe deja')
            }
            else
            {
                const values =[req.body.name,req.body.email,req.body.password]
               db.query('INSERT INTO login (name, email, password) VALUES (?, ?, ?)',values,(errQ,succQ)=>
               {
                if(errQ)
                {
                    res.json('erreur de requette')
                }
                else
                {
                    res.json({ status: 'success' });
                }
               })
            }
        }
    })
})

app.post('/login',(req,res)=>
{
    const password = req.body.password;
    db.query('SELECT * FROM login WHERE email = ?', [req.body.email], (err, result)=>
    {
        if(err)
        {
            res.json({status : 'erreur de requette sql '})
        }
        else
        {
            if(result.length<1)
            {
                res.json('email nexiste pas')
            }
            else
            {
                if (password === result[0].password) {
                    const name = result[0].name;
                    const token = jwt.sign({ name }, 'jwt-secret-key', { expiresIn: '1d' });
                  
                    // Avant d'envoyer la réponse JSON, définissez le cookie avec 'res.cookie()'.
                    res.cookie('token', token, {
                      // Options du cookie (facultatif)
                      httpOnly: true, // Le cookie ne sera pas accessible par JavaScript côté client.
                      secure: true, // Le cookie ne sera envoyé que via HTTPS si vous l'utilisez en production.
                      sameSite: 'strict', // Le cookie ne sera envoyé que pour les requêtes provenant du même site (protection CSRF).
                    });
  
                    // Maintenant, envoyez la réponse JSON au client.
                    res.json({ status: "password correcte" });
                  }
                  
                else
                {
                    res.json({status:"password false"})
                }
            }
        }
    })
});

const virifietoken=(req,res,next)=>
{
    const token = req.cookies.token;
    if(!token)
    {
        res.json({error:"you are not auth"})
    }
    else
    {
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>
        {
            if(err)
            {
                res.json({error : "token not ok"})
            }
            else
            {
                req.name = decoded.name
                next()
            }
        })
    }
}
app.get('/welcome',virifietoken,(req,res)=>
{
   return res.json({status : "success",name : req.name})
})


app.listen(8000,()=>
{
    console.log('server run on 8000')
})


