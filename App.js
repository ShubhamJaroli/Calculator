import React, { Component } from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';

const styles = StyleSheet.create(
  {
    container:
    {
      flex:1
    },
    calculation:
    {
      backgroundColor:'white',
      color:'black',
      flex:1,
      fontSize:35,
      borderBottomColor:'black',
      borderBottomWidth:0.5
    },
    result:
    {
      backgroundColor:'white',
      color:'black',
      flex:1,
      fontSize:35
    },
    button:
    {
      flex:6,
      flexDirection:'row',
    },
    digit:
    {
      flex:3,
      color:'white',
      backgroundColor:'#404040',
      flexDirection:'column',
      textAlign:"left",
      justifyContent:'space-between',
      borderWidth:2,
      borderColor:'black'
    },
    digitPart:
    {
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',
      borderWidth:0.5,
      borderColor:'black'
    },
    operator:
    {
      flex:1,
      color:'white',
      backgroundColor:'#5e5e5e',
      flexDirection:'column',
       justifyContent:'space-between'
    },
    number:
    {
        flex:1,
        color:'white',
        fontSize:50,
        textAlign:"center"
    },
    sign:
    {
      color:'white',
      fontSize:50,
      textAlign:"center",
     
    }
  }
)
export default class HelloWorldApp extends Component 
{
  constructor()
  {
    super()
    this.state=
    {
        Calculation:"",
        Result:"",
    }
  }

  addDigit(number)
  {
      var s=this.state.Calculation;
      var t = s.split("");
      var l = t.length; 
      if(number=='.')
      {
        for(let i = l;i>=0;i--)
        {
          if( t[i]=='+' || t[i]=='-' || t[i]=='*' || t[i]=='/' )
              break;
          if( t[i]=='.')
              return;
        }
      }
      if(number=='=')
      {
        if( t[l-1]=='+' || t[l-1]=='-'|| t[l-1]=='*' || t[l-1 ]=='/' || t[l-1]=='.')
          this.removeOne();
        this.calculateResult();
        return;
      }
      s= s+number;
      this.setState( { Calculation : s } )
  }

  addoperate(operator)
  {
    if(operator == 'D')
     this.removeOne()
    else if(operator == 'C')
      this.setState( { Calculation:"" , Result:"" } );
    else
    {
      var s = this.state.Calculation;
      let t = s.split('');
      var x = t.pop();
      if(x == '+' || x == '-' || x == '*' || x == '/' )
        return;
      this.setState( { Calculation : s+operator } )
    } 
  }

  removeOne()
  { 
      if(this.state.Calculation == "")
        return;
      var s = this.state.Calculation;
      let t = s.split('');
      t.pop();
      s = t.join('')
      this.setState( { Calculation : s } )
  }

  calculateResult()
  {
    try
    {
      this.setState( { Result : eval(this.state.Calculation) } )
    }
    catch(err)
    { console.log("Error:"+err); }    
  }

  render() 
  {
    var x = [[7,8,9], [4,5,6], [1,2,3], ['.',0,'=']],row=[];
    for(let i=0;i<4;i++)  // Consider digit part
    {
      let coloumn=[];
      for(let j=0;j<3;j++)
        coloumn.push(<TouchableOpacity onPress={()=>this.addDigit(x[i][j])}><Text style={styles.number}>{x[i][j]}</Text></TouchableOpacity>)
      row.push( <View style={styles.digitPart}>{coloumn}</View>)
    }

    var y=['D','+','-','*','/','C'],operator=[];
    for(let i=0;i<6;i++)  //Cosider operator part
      operator.push( <TouchableOpacity onPress={()=>this.addoperate(y[i])}><Text style={styles.sign}>{y[i]}</Text></TouchableOpacity>)

    return (
      <View style={{ flex: 1},styles.container}>
        <Text style={styles.calculation} >{this.state.Calculation}</Text>
        <Text style={styles.result}>{this.state.Result}</Text>
        <View style={styles.button}>
            <View style={styles.digit}>{row}</View>
            <View style={styles.operator}>{operator}</View>
        </View>
      </View>
    );
  }
}
