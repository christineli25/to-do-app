const express = require('express')
const router = express.Router()
const supabase = require('../supabaseClient')


router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
    if(error) return res.status(500).json({ error: error.message })
    res.json(data)
})

router.post('/', async (req, res) => {
    const title = req.body.title
    if(!title) return res.status(400).json({ error: 'Title is required'})
    const { data, error } = await supabase
        .from('todos')
        .insert({ title })
        .select()
    if(error) return res.status(500).json({ error: error.message })
    res.status(201).json(data[0])
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

    if(error) return res.status(500).json({ error: error.message })
    res.status(204).send()
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const completed = req.body.completed

    const { data, error } = await supabase
        .from('todos')
        .update({ title, completed })
        .eq('id', id)
        .select()
        .single()
    
    if(error) return res.status(500).json({ error: error.message })
    res.json(data)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', id)
        .single()
    
    if(error) return res.status(404).json({ error: error.message })
    res.json(data)
})

module.exports = router