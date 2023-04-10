import React, { useState } from 'react'
import { Accordion, Collapse } from 'reactstrap'
import style from './Acc.module.scss'

const ListItem = (prop) => {
    const [open,setOpen]=useState(false)
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    //   console.log(open)
    return (
        <div style={prop.style} onClick={()=>prop.Click()} className={style.accordion_wrp}>
            <div className={style.accordion_cont}>
             ==>   {prop.name}
            </div>
        </div>
    )
}

export default ListItem