import React from "react";
import "./App.css";
import { Form, FormGroup, Input, Button, Row, Col } from "reactstrap";
import Students from "./components/Students";
import StudentInfo from "./components/StudentInfo";
import { Route, NavLink } from "react-router-dom";
import UUID4 from "uuid4";
import AttendanceReport from "./components/AttendanceReport";
import StandupReport from "./components/StandupReport";

class App extends React.Component{
    state = {
        students: [], firstName: "", lastName: ""
    };
    
    componentDidMount(){
        if( localStorage.hasOwnProperty( "web20_students" ) ){
            this.setState( {
                students: JSON.parse( localStorage.getItem( "web20_students" ) )
            } );
        }
    }
    
    removeStudent = id => {
        this.setState( state => {
            let students = state.students.filter( student => {
                return student.id !== id;
                
            } );
            localStorage.removeItem( "web20_students" );
            localStorage.setItem( "web20_students",
                JSON.stringify( students )
            );
            return ( { students } );
        } );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value.trim() } );
    };
    
    submitStudent = e => {
        e.preventDefault();
        this.setState( state => {
            let students = [ ...state.students ];
            students.push( {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                id: UUID4(),
                github: "",
            } );
            localStorage.removeItem( "web20_students" );
            localStorage.setItem( "web20_students",
                JSON.stringify( students )
            );
            return ( { students, firstName: "", lastName: "" } );
        } );
        
    };
    
    render(){
        return ( <div className="App">
                <header className="App-header">
                    <h1>WEB20</h1>
                    <nav>
                        <NavLink to={ "/" }>Home</NavLink>
                        <NavLink to={ "/attendance" }>Attendance
                            Report</NavLink>
                        <NavLink to={ "/standup" }>StandUp Report</NavLink>
                    </nav>
                </header>
                <Form onSubmit={ this.submitStudent }>
                    <Row form>
                        <Col md={ 6 }>
                            <FormGroup>
                                <Input type="text" id="firstName"
                                       name="firstName"
                                       placeholder="First Name"
                                       onChange={ this.onChange }
                                       value={ this.state.firstName }
                                />
                            </FormGroup>
                        </Col>
                        <Col md={ 6 }>
                            <FormGroup>
                                <Input type="text" id="lastName" name="lastName"
                                       placeholder="Last Name"
                                       onChange={ this.onChange }
                                       value={ this.state.lastName }
                                />
                            </FormGroup>
                        </Col>
                    
                    </Row>
                    <Button>Submit</Button>
                </Form>
                
                <Route path={ "/" } exact
                       render={ props => <Students { ...props }
                                                   removeStudent={ this.removeStudent }
                                                   students={ this.state.students }/> }/>
                <Route path={ "/student/:id" }
                       render={ props => <StudentInfo { ...props }
                                                      students={ this.state.students }/> }/>
                <Route path={ "/attendance" } component={ AttendanceReport }/>
                <Route path={ "/standup" } component={ StandupReport }/>
            </div>
        
        );
    }
    
}

export default App;
