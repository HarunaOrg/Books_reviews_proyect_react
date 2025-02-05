import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { userData } from '../User/userSlice'
import { Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import "./NewBook.scss"

const NewBook = () => {

    const identification = useSelector(userData)

    const navigate = useNavigate()

    const [bookState, setBookState] = useState({
        title: '',
        series: '',
        author: '',
        genre: '',
        year: '',
        book_cover: '',
        author_wiki_url: '',
        shop_url: '',
        synopsis: ''
    })

    const handleChange = (e) => {
        setBookState({
            ...bookState,
            [e.target.name]: e.target.value
        })
    }

    const clearValidationMessageHandler = () => {

        if (bookState.isError === true) {

            setTimeout(() => {
                setBookState({
                    ...bookState,
                    message: ""
                })
            }, 1000);
        }
    }

    let requirements = {
        headers: {
            "Authorization": `Bearer ${identification.token}`
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            await axios.post("https://bookapi.up.railway.app/api/book/createBook", bookState, requirements)

            if (!bookState.isError) {

                setBookState({
                    ...bookState,
                    isError: false,
                    message: 'Libro añadido correctamente'
                })

                setTimeout(() => {
                    navigate("/books")

                }, 1500)
            } else if (
                bookState.title ||
                bookState.series ||
                bookState.author ||
                bookState.genre ||
                bookState.year ||
                bookState.book_cover ||
                bookState.author_wiki_url ||
                bookState.shop_url ||
                bookState.synopsis == ""
            ) {

                setBookState({
                    ...bookState,
                    isError: true,
                    message: 'Rellena todos los campos para continuar'
                })

            } else {
                setBookState({
                    ...bookState,
                    isError: true,
                    message: "Ha habido un error"
                })
            }

        } catch (error) {

            if (
                bookState.title ||
                bookState.series ||
                bookState.author ||
                bookState.genre ||
                bookState.year ||
                bookState.book_cover ||
                bookState.author_wiki_url ||
                bookState.shop_url ||
                bookState.synopsis == ""
            ) {
                setBookState({
                    ...bookState,
                    isError: true,
                    message: 'Rellena todos los campos para continuar'
                })

            } else {
                setBookState({
                    ...bookState,
                    isError: true,
                    message: error.message
                })
            }
        }
    }
    return (

        <Form className='newBookForm' onSubmit={handleSubmit} >
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicTitle" >
                        <Form.Label className='newBookLabel'>
                            Título
                        </Form.Label >
                        <Form.Control
                            className='newBookInput'
                            type="text" name='title'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Título oficial del libro en España
                        </Form.Text>
                    </Form.Group >
                </Col >
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicSeries">
                        <Form.Label className='newBookLabel'>
                            Saga
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="text"
                            name='series'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Indica la saga a la que pertenece
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label className='newBookLabel'>
                            Autor
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="text" name='author'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Autor del libro
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicGenre">
                        <Form.Label className='newBookLabel'>
                            Género literario
                        </Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            className='newBookInput'
                            name='genre'
                            onClick={clearValidationMessageHandler}
                            onChange={handleChange}>
                            <option>Abrir el desplegable</option>
                            <option value="Autobiografía">Autobiografía</option>
                            <option value="Aventuras">Aventuras</option>
                            <option value="Ciencia ficción">Ciencia ficción</option>
                            <option value="Policíaca">Policíaca</option>
                            <option value="Educativa">Educativa</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Histórica">Histórica</option>
                            <option value="Humor">Humor</option>
                            <option value="Infantil">Infantil</option>
                            <option value="Misterio">Misterio</option>
                            <option value="Novela negra">Novela negra</option>
                            <option value="Romance">Romance</option>
                            <option value="Terror">Terror</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Selecciona uno entre los géneros indicados
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicYear">
                        <Form.Label className='newBookLabel'>
                            Fecha de publicación
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="date"
                            min="01-01-1800"
                            max="31-12-2050"
                            name='year'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Fecha de publicación de la edición Española
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicBookCover">
                        <Form.Label className='newBookLabel'>
                            Portada
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="text"
                            name='book_cover'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Imagen oficial de la cubierta
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicAuthorWikiUrl">
                        <Form.Label className='newBookLabel'>
                            Wikipedia del autor
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="text"
                            name='author_wiki_url'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Enlace de la wikipidia oficial del autor
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                    <Form.Group className="mb-3" controlId="formBasicShopUrl">
                        <Form.Label className='newBookLabel'>
                            A la venta en
                        </Form.Label>
                        <Form.Control
                            className='newBookInput'
                            type="text"
                            name='shop_url'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Enlace de compra en amazon
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Form.Group className="mb-3 " controlId="formBasicSynopsis">
                        <Form.Label className='newBookLabel'>
                            Sinopsis
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            className='newBookInput newBookSynopsis'
                            type="text"
                            name='synopsis'
                            placeholder='Escribe aquí'
                            onChange={handleChange}
                            onClick={clearValidationMessageHandler}
                        />
                        <Form.Text className="text-muted">
                            Resumen del libro en Español
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                    <Form.Group className="mb-3 newBookBoxButton">
                        <button className='newBookSendButtom' variant="primary" type="submit">
                            Añadir libro
                        </button>
                        <div className='newBookMessage'>
                            {
                                bookState.isError ?
                                    (<p style={{ color: "red" }}>{bookState.message}</p>)
                                    :
                                    (<p style={{ color: "green" }}>{bookState.message}</p>)
                            }
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form >
    )
}

export default NewBook