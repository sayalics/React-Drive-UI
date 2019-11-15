import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';
import {  ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import {  MenuItem} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ViewIcon from '@material-ui/icons/VisibilityOutlined';
import FileViewer from 'react-file-viewer';
import Modal from '@material-ui/core/Modal';
import FileIcon, { defaultStyles } from 'react-file-icon';
import samplepdf from '../../assets/samplepdf.pdf';
import sampledoc from '../../assets/sampledoc.doc';
import samplezip from  '../../assets/samplezip.zip';
import samplexlsx from '../../assets/samplexlsx.xlsx';
import tests from '../../assets/tests.py';
import SampleSpec from '../../assets/SampleSpec.docx';

const styles = theme => ({
    root: {
        display: 'flex',
      },
      
      cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(0),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        boxShadow:'none',
        // border: '1px solid',
        // borderColor:'#e5e5e5'
      },
     
      cardContent: {
        flexGrow: 1,
      },
      contextmenu : {
        backgroundColor: theme.palette.background.paper,
        boxShadow : theme.shadows[3]
      },
      cardMedia:{
        padding: theme.spacing(3)

      },
      papermodal: {
        position: 'relative',
        width: theme.spacing(120),
        height: theme.spacing(80),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        outline: 'none',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      contextmenu : {
        backgroundColor: theme.palette.background.paper,
        boxShadow : theme.shadows[3]
      },
      
})

class MyDrive extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open : false
    }
  }

  handleOpenFile = () => {
    this.setState({open: true});
  }

  handleCloseFile = () => {
    this.setState({open: false});
  }
 
  handleClickAway = () => {
    this.setState({ open: false });  
  };
  
  fileNameAndExt(str){
    var file = str.split('/').pop();
    return [file.substr(0,file.lastIndexOf('.')),file.substr(file.lastIndexOf('.')+1,file.length)]
  }   

    render(){
        const { classes } = this.props;
        var filelist = [
          {"filename":"SampleSpec.docx" , "filepath": SampleSpec }, 
          {"filename":"samplepdf.pdf" , "filepath": samplepdf },
          {"filename":"samplexlsx.xlsx" , "filepath": samplexlsx },
          {"filename":"samplezip.zip" , "filepath": samplezip },
          {"filename":"sampledoc.doc" , "filepath": sampledoc },
          {"filename":"tests.py" , "filepath": tests },
  
        ]
        const filesIcon = filelist.map((i) => {
            const x = this.fileNameAndExt(i.filename);
            return(
                // <div style={{height:200, width:200}}>
                // <FileIcon extension={x[1]} {...defaultStyles[x[1]]} />
                // </div>
                <Grid item  xs={12} sm={6} md={3} lg={2}>
                <ContextMenuTrigger id="some_unique_identifier">
                  <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia}>
                    
                    <FileIcon extension={x[1]} {...defaultStyles[x[1]]} />
                    </CardMedia>
                      <Typography gutterBottom variant="h6" component="h2">
                        x[0]
                      </Typography>
                    </Card>
                </ContextMenuTrigger>
              </Grid>
            )
        })

        return(
        <Grid direction="column">

        <Container className={classes.cardGrid} maxWidth="100%" >
          <Typography variant='h5'> My Drive </Typography>
          <Divider style={{marginBottom:'2%'}} />
          <Typography variant="h6" color="textPrimary">Folders</Typography>
          {/* End hero unit */}

          <Grid container spacing={8} direction="row" >
            
          {filesIcon}
            
          </Grid>
        </Container>


        <Container className={classes.cardGrid} maxWidth="100%" >
          <Typography variant="h6" color="textPrimary">Files</Typography>
          {/* End hero unit */}
          <Grid container spacing={8} direction="row" >
            {filesIcon}
          </Grid>
          
          <ContextMenu id="some_unique_identifier" className={classes.contextmenu} >
                
                <MenuItem 
                    className={classes.Container}
                    onClick={this.handleOpenFile}
                > 
                            {<ViewIcon color="action" style={{marginRight:'15px'}} />} View
                </MenuItem>
                <MenuItem > {<DeleteIcon color="action" style={{marginRight:'15px'}}/>} Delete</MenuItem>
                
              
            </ContextMenu>
         
        
            <Modal
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                          open={this.state.open}
                          onClose={this.handleCloseFile}
                          onClickAway={this.handleClickAway}
                          className={classes.modal}
                          >
                          <div  className={classes.papermodal}>
                            <FileViewer
                            fileType='pdf'
                            filePath={samplepdf}
                            />
                              
                          </div>
            </Modal>
        </Container>
        
        </Grid>

);       
}
}

export default withStyles(styles) (MyDrive);