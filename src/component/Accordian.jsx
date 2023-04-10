import React, { useState } from 'react'
import { data } from './../constant/constant';
import style from './Acc.module.scss'
import { Accordion, Collapse } from 'reactstrap';
import ListItem from './ListItem';

class Accordian extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            newArr:[],
            test:'adyg'
        }
    }

    createNewArray=(data)=> {
        const arr = [];
        data.forEach((item) => {
          const path = item.path.split("/");
          let currentNode = arr;
      
          path.forEach((name, index) => {
            if (index === path.length - 1) {
                currentNode.push({
                  name,
                  file: item,
                });
              }else{
                  const existingNode = currentNode.find((node) => node.name === name);
                //   console.log(name,currentNode)
                  if (existingNode) {
                    currentNode = existingNode.child;
                  } else {
                    const newNode = {
                      name,
                      collaps: true,
                      child: [],
                      state:path.filter((elm,ind)=>ind <=index).join('_')
                    };
                    currentNode.push(newNode);
                    currentNode = newNode.child;
                  }
    
              }
          });
        });
      
        return this.setState(state=>({newArr:arr}));
      }
    componentDidMount(){
        this.createNewArray(data)
    }

    render(){
        // console.log(this.state)
        return (
            <>
            <h4>The give data is filtered and shown below as Accordion depending on path</h4>
            {
                this.state.newArr.map((prop,key)=>{
                    if(prop.collaps){
                        let firstdd = {};
                        firstdd[prop["state"]] = !this.state[prop.state];
                        // this.setState([prop["name"]])
                        return(
                            <React.Fragment key={key}>
                                <ListItem  {...prop} Click={() => this.setState(firstdd)} />
                                <Collapse isOpen={this.state[prop.state]}>
                                    {prop.child.map((prop2,key)=>{
                                        let secondd = {};
                                        secondd[prop2["state"]] = !this.state[prop2.state];
                                            return(
                                                <React.Fragment key={key}>
                                                <ListItem  {...prop2} Click={() => this.setState(secondd)} style={{paddingLeft:`30px`}}/>
                                                <Collapse isOpen={this.state[prop2.state]}>
                                                    {prop2.child.map((prop3,key)=>{
                                                        let thirdd = {};
                                                        thirdd[prop3["state"]] = !this.state[prop3.state];
                                                            return(
                                                                <React.Fragment key={key}>
                                                                    <ListItem key={key} {...prop3} Click={() => this.setState(thirdd)} style={{paddingLeft:`60px`}}/>
                                                                    <Collapse isOpen={this.state[prop3.state]}>
                                                                        {prop3.child.map((prop4,key)=>{
                                                                                return(
                                                                                    <React.Fragment key={key}>
                                                                                        <ListItem key={key} {...prop4} style={{paddingLeft:`90px`}} Click={()=>window.open(prop4.file.url,'_blank')}/>
                                                                                    </React.Fragment>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Collapse>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </Collapse>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </Collapse>
                            </React.Fragment>
                            
                        )
                    }
                })
}
            </>

            
        )
    }
}

export default Accordian