

import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';

export default class App extends Component {
    constructor(){
        super()
        this.state={
            resultText:"",
            calculationText:""
        }
        this.operations=["del",'/','*','+','-']
        this.nums=[["AC",'+/-',"%"],[7,8,9],[4,5,6],[1,2,3],['.',0,"="]]
    }

    calculateResult(){
        const text=this.state.resultText
       this.setState({
           calculationText:eval(text)
       })
                    
    }
    validate(){
        const text=this.state.resultText
        switch(text.slice(-1)){
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }
    clearDisplay(){
        const text=this.state.resultText
        this.setState({
            resultText:"",
            calculationText:"",
        })
    }
    percentDisplay(){
        const text=this.state.resultText
        this.setState({
            resultText:this.state.resultText,
            calculationText:this.state.resultText/100,
         })
    }
    toggleDisplay(){
        const text=this.state.resultText
        this.setState({
            resultText:this.state.resultText
        })
    }
    
    buttonPressed(text){

            if(text== '='){
                return this.validate() && this.calculateResult()
            }
            this.setState({
            resultText:this.state.resultText+text
            })

            if(text== "AC"){
                return this.clearDisplay()
            }
            this.setState({
                resultText:this.state.resultText+text,
                calculateText:this.state.calculationText+text,
            })

            if(text== '%'){
                return this.percentDisplay()
            }
            this.setState({
                resultText:this.state.resultText+text,
            })

            if(text== '+/-'){
                return this.toggleDisplay()
            }
            this.setState({
                resultText:this.state.resultText+text,
            })
    }
    

    operate(operation) {
        switch(operation) {
            case 'del':
                let text=this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText:text.join('')
                })
            break
            case '+':
            case '-':
            case '*':
            case '/':
                    const lastChar=this.state.resultText.split('').pop()
                    if(this.operations.indexOf(lastChar)>0) return
                    if(this.state.text=="") return
                    this.setState({
                        resultText: this.state.resultText + operation
                    })

        }
    }

    render(){
            let rows=[]
            for(let i=0;i<5;i++){
                let row=[]
                for(let j=0;j<3;j++){
                    row.push(
                    <TouchableOpacity key={this.nums[i][j]} style={styles.btn} onPress={()=>this.buttonPressed(this.nums[i][j])} >
                        <Text style={styles.btnText}>{this.nums[i][j]}</Text>
                    </TouchableOpacity>)
                }
                rows.push(<View key={i} style={styles.row}>{row}</View>)
            }

            
            let ops=[]
            for(let i=0;i<5;i++){
                ops.push(<TouchableOpacity key ={this.operations[i]} style={[styles.btn,styles.opbtn]} onPress={()=>this.operate(this.operations[i])}>
                    <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
                </TouchableOpacity>)
            }

        return (
            <View style={styles.container}> 
                <View style={styles.result}> 
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}> 
                    <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                </View>
                
                <View style={styles.buttons}> 
                    <View style={styles.numbers}> 
                        {rows}
                    </View>  
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
            );
        }
    }
const styles=StyleSheet.create({
    container:{
        flex :1
    },

    row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
    },

    result:{
        flex:2,
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    
   resultText:{
       fontSize:35,
       color:'white',
    },

    calculation:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'flex-end',
    },

    calculationText:{
        fontSize:50,
        color:'white',
     },

    btn:{
        flex:5,
        alignItems:'center',
        alignSelf:'stretch',
        justifyContent:'center',
        borderRadius:30,
        borderColor:'black',
        borderWidth:1,
        marginTop:7,
        marginBottom:7,
        marginRight:7,
        marginLeft:7,
        backgroundColor:'#434343',
    },
    opbtn:{
        backgroundColor:'orange',
    },

    btnText:{
        fontSize:30,
        color:'white'
    },

    white:{
        color:'black',
    },
  
    buttons:{
        flex:5,
        flexDirection:'row',    
    },
    
    numbers:{
        flex:3,
        backgroundColor:'black'
    },
    operations:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'stretch',
        backgroundColor:'black'
    },
})
