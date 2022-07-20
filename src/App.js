import React, { useState, useEffect } from "react";
import { Auth, Hub, API, Storage } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from './aws-exports.js';
import { listGobjs } from './graphql/queries';
import { createGobj as createGobjMutation, 
         deleteGobj as deleteGobjMutation, 
         updateGobj as updateGobjMutation } from './graphql/mutations';
import { Heading,
         ToggleButton  } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";


Amplify.configure(config);

const initialFormState = { customer: '', 
                           service: '', 
                           claim: '', 
                           winloss: '', 
                           priority: '', 
                           serviceteam: '', 
                           user: '' }

function App() {

  // For midway authentication
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log(event)
          console.log(data)
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }


  // For Gobj
  const [gobjs, setGobjs] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchGobjs();
  }, []);

  async function fetchGobjs() {
    const apiData = await API.graphql({ query: listGobjs });
    setGobjs(apiData.data.listGobjs.items);
  }

  // Creating gobjs
  async function createGobj() {
    if (!formData.customer) return;
    // await API.graphql({ query: createGobjMutation, variables: { input: formData } });
    await API.graphql({ query: createGobjMutation, variables: { input: { customer: formData.customer, 
                                                                         service: formData.service,
                                                                         claim: formData.claim,
                                                                         winloss: formData.winloss,
                                                                         priority: formData.priority,
                                                                         serviceteam: formData.serviceteam,
                                                                         user: formData.user
                                                                        } } });
    setGobjs([ ...gobjs, formData ]);
    setFormData(initialFormState);
    // setAdding(!adding);
    // setEditing('');
  }

  // Deleting gobjs
  async function deleteGobj({ id }){
    const newGobjArray = gobjs.filter(gobj => gobj.id !== id);
    setGobjs(newGobjArray);
    await API.graphql({ query: deleteGobjMutation, variables: { input: { id } }});
  }

  async function showUser(){
    console.log(user);
  }

  return (
    <div className="App">

    {user ? (
      <>
      <p>
        User is signed in!
      </p>

      {/* Sign out button */}
      <button 
        onClick={() => Auth.signOut()}>Sign Out
      </button>

      </>
    ) : (
      <>
      <p>
        User is not signed in!
      </p>

      <button 
        onClick={() => Auth.federatedSignIn({customProvider: "AmazonFederate"})}>Signin With Midway
      </button>

      <Heading level={1}>Dashboard</Heading>
      <ToggleButton onClick={() => showUser()}>
        Click to Add
      </ToggleButton>

      <table>
        <thead>
        <tr>
            <td>
              {/* Customer, SA, Gap input  */}
              <textarea
                className='inputStyle'
                onChange={e => setFormData({ ...formData, 'customer': e.target.value})}
                placeholder="Customer, SA, Gap"
                value={formData.customer}
              />
            </td>
            <td>
              {/* Service  */}
              <textarea
                className='inputStyle'
                onChange={e => setFormData({ ...formData, 'service': e.target.value})}
                placeholder="Service"
                value={formData.service}
              />
            </td>
            <td>
              {/* Claim  */}
              <textarea
                className='inputStyle'
                onChange={e => setFormData({ ...formData, 'claim': e.target.value})}
                placeholder={"GCP Claim/Customer Feedback"}
                value={formData.claim}
              />        
            </td>
            <td>
              {/* Win/Loss  */}
              <textarea
                className='inputStyle'
                onChange={e => setFormData({ ...formData, 'winloss': e.target.value})}
                placeholder="Win/Loss to GCP? Key factor resulting in loss and learnings"
                value={formData.winloss}
              />
            </td>
            <td>
              {/* Priority  */}
              <select name="priority" 
                      id="addPriority" 
                      required 
                      value={formData.priority} 
                      onChange={(e) => setFormData({ ...formData, 'priority': e.target.value})}>
                  <option>Select Priority</option>
                  <option value="Priority: High">Priority: High</option>
                  <option value="Priority: Medium">Priority: Medium</option>
                  <option value="Priority: Low">Priority: Low</option>
              </select>   
            </td>
            <td>
              {/* Service Team  */}
              <textarea
                className='inputStyle'
                onChange={e => setFormData({ ...formData, 'serviceteam': e.target.value})}
                placeholder="Service Team PFR/Roadmap"
                value={formData.serviceteam}
              />
            </td>
            <button className='addButton' onClick={() => createGobj()}>ADD</button>  
          </tr>
        </thead>
      </table>
      </>
    )}
   
     
    </div>
  );
}

export default App;
