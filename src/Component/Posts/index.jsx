import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { Button } from "@material-ui/core";
import { getPosts, savePosts, updatePosts, deletePosts } from "../../server/fetchers/posts";
import "./style.css"

const About = () => {
    const [responceInfo, setResponceInfo] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            setResponceInfo(await getPosts())
        })();
    },[])

    const handleChange = (e, index) => {
        let titleChange = [...responceInfo]
        titleChange.forEach((value, i) => {
            if (index === i){
                value.title = e.target.value
                value.change = true
            }
        })
        setResponceInfo(titleChange)
        
    }
    const handleChangePhone = (e, index) => {
        let phoneChange = [...responceInfo]
        phoneChange.forEach((value, i) => {
            if (index === i){
                value.phone = e.target.value
                value.change = true
            }
        })
        setResponceInfo(phoneChange)
    }
    const createUpdateListHandler = () => {
            setResponceInfo([
                ...responceInfo,
                {
                    title: "",
                    phone: "",
                    internalId: crypto.randomUUID(),
                }
                ]);
            }
    const onSave = () => {
            responceInfo.forEach(async(value)=>{
                if (value.internalId) {
                    await savePosts({title: value.title, phone: value.phone})
                } else if (value.change){
                    await updatePosts({id: value.id, title: value.title, phone: value.phone})
                }
            })
    };
    const deleteElement = (indexOff) => {
        let deleteInfo = [...responceInfo]
        deleteInfo.forEach(async(value, index)=>{
            if (index === indexOff) {
                value.delete = true
                await deletePosts({id: value.id, title: value.title, phone: value.phone})
            } 
        })
        setResponceInfo(deleteInfo.filter((post) => post.delete !== true))
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>A table with name and phone number</caption>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Phone</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
            {responceInfo.map((item, index)=>
                <>
                        <TableRow key={item.title}>
                        <TableCell component="th" scope="row">
                            <Input type='text' onChange={(e) => handleChange(e, index)} value={item.title} />
                        </TableCell>
                        <TableCell >
                            <Input type='number' onChange={(e) => handleChangePhone(e, index)} value={item.phone} />
                        </TableCell>
                        <Button className={'button'} onClick = {()=>deleteElement(index)} variant="contained" color="success">
                            удалить
                        </Button>
                        </TableRow>
                </>
            )}
                        </TableBody>
                        </Table>
                        <Button className={'button'} onClick = {createUpdateListHandler} variant="contained" color="success">
                            Создать
                        </Button>
                        <Button className={'button'} onClick = {onSave} variant="contained" color="success">
                            Сохранить
                        </Button>
            </TableContainer>
        </>
    )
}

export default About;