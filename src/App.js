import React, { Component } from 'react';
import { Link } from 'found';
import { Sidebar, Items, Item, LinkClassName, Text, Icon } from './styles';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar>
          <Items>
            <Item>
              <Link to="/" className={LinkClassName} exact>
                <Icon className="material-icons">home</Icon>
                <Text>Inicio</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/assists" className={LinkClassName} exact>
                <Icon className="material-icons">playlist_add_check</Icon>
                <Text>Asistencias</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/reports" className={LinkClassName} exact>
                <Icon className="material-icons">assessment</Icon>
                <Text>Reportes</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/billing" className={LinkClassName} exact>
                <Icon className="material-icons">attach_money</Icon>
                <Text>Facturación</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/users" className={LinkClassName} exact>
                <Icon className="material-icons">people</Icon>
                <Text>Usuarios</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/disciplines" className={LinkClassName} exact>
                <Icon className="material-icons">pages</Icon>
                <Text>Disciplinas</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/schedules" className={LinkClassName} exact>
                <Icon className="material-icons">today</Icon>
                <Text>Horarios</Text>
              </Link>
            </Item>
          </Items>
        </Sidebar>
        {this.props.children}
      </div>
    );
  }
}

export default App;