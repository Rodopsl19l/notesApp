import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DeleteNote, GetNotes} from '../services/notes';
import {Button} from 'react-bootstrap';
import { EditNoteModal } from './NoteModal';

export const NotesTable = () => {
    const notes = useSelector(state => state.notesReducer.notes);
    const dispatch = useDispatch();

    useEffect(() => {
        GetNotes(dispatch);
    }, []);

    return <table className="table table-dark">
        <tbody>
            {
                notes.map(n => 
                    <tr>
                        <td style={{width: '3rem'}}>
                            <EditNoteModal note={n} />
                        </td>

                        <td style={{width: '3rem'}}>
                            <Button className='btn btn-danger' onClick={() => DeleteNote(dispatch, n)}>
                                Eliminar
                            </Button>
                        </td>

                        <td style={{textAlign: 'left'}}>{n.value}</td>
                    </tr>
                )
            }
        </tbody>
    </table>
}