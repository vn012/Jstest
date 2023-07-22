const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const data = path.join(__dirname, 'data', 'db.json');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/getData', (req, res) => {
    fs.readFile(data, 'utf8', (err, jsonData) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao ler o arquivo JSON.');
        } else {
            const parsedData = JSON.parse(jsonData);
            res.json(parsedData);
        }
    });
});

app.post('/api/updateData', (req, res) => {
    const newPerson = req.body;

    fs.readFile(data, 'utf8', (err, jsonData) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
        } else {
            try {
                const peopleArray = JSON.parse(jsonData);
                // Adiciona o novo objeto ao array existente
                peopleArray.push(newPerson);

                // Escreve o array atualizado de volta ao arquivo JSON
                fs.writeFile(data, JSON.stringify(peopleArray, null, 2), 'utf8', err => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Erro ao atualizar o arquivo JSON.' });
                    } else {
                        // Lê novamente o arquivo para obter o conteúdo atualizado
                        fs.readFile(data, 'utf8', (err, updatedData) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Erro ao ler o arquivo JSON atualizado.' });
                            } else {
                                // Envia o conteúdo atualizado como resposta para a solicitação POST
                                const parsedData = JSON.parse(updatedData);
                                res.json(parsedData);
                            }
                        });
                    }
                });
            } catch (parseError) {
                console.error(parseError);
                res.status(500).json({ error: 'Erro ao analisar o arquivo JSON.' });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
