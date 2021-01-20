import React, {useState, useEffect} from 'react';
import { Button, Form, InputGroup, Modal, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NewNote, EditNote } from '../services/notes';

export const NewNoteModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button onClick={handleShow} className="btn btn-success">
                Nueva nota
            </Button>

            <NoteModal note={null} hanldeFormSubmit={NewNote} show={show} handleClose={handleClose}/>
        </div>
    );
}

export const EditNoteModal = ({note}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button onClick={handleShow} className="btn btn-warning">
                Editar nota
            </Button>

            <NoteModal note={note} hanldeFormSubmit={EditNote} show={show} handleClose={handleClose}/>
        </div>
    );
}

const NoteModal = ({note, hanldeFormSubmit, show, handleClose}) => {
    const [modalNote, setModalNote] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setModalNote(note);
    }, [note]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Form onSubmit={event => {
                event.preventDefault();
                hanldeFormSubmit(dispatch, modalNote);
            }}>
                <Modal.Body>
                    <InputGroup>
                        <FormControl value={modalNote === null ? '' : modalNote.value} 
                        onChange={event => setModalNote({...modalNote, value: event.target.value})}/>
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>

                    <Button type="submit" variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>           
            </Form>
        </Modal>
    );
}