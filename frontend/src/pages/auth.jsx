import { useState } from 'react'
import Web3 from 'web3'
import { abi, networks } from "../../../build/contracts/ProductVerification.json"
import Details from './Details';
import "../../src/css/auth.css"


async function initWeb3() {
  if (window.ethereum) {
    await window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    var networkId = await web3.eth.net.getId();
    console.log("id = ", networkId, accounts);
    const account = accounts[0];
    const contract = new web3.eth.Contract(abi, networks[networkId].address);
    console.log(contract, account);
    localStorage.setItem("networkId", networkId)
    localStorage.setItem("account", account)
    localStorage.setItem("AuthOwnerHash", account)
    console.log(typeof (localStorage.getItem("isAuthenticated")));
    window.location.reload;
    // return account;
  } else {
    alert("No Ethereum Window Detected!!");
    // return;
  }

}

function authKardo(event) {
  event.preventDefault();
  const address = event.target[0].value;
  const password = event.target[1].value;
  console.log(password);
  if (password == "Test@123") {
    localStorage.setItem('isAuthenticated', "1")
    window.location.href = "/details";
  }
}

async function logout() {
  localStorage.clear();
  window.location.reload();
}

function Auth() {

  initWeb3().then(res => {
    console.log(localStorage.getItem('isAuthenticated'));
    console.log(localStorage.getItem('AuthOwnerHash'));
    // const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
    // console.log(isAuthenticated, typeof(isAuthenticated), r);
  });

  return (
    <div>
      {localStorage.getItem("isAuthenticated") == "1" ?
        (<Details />)
        :
        (<div class="container">
          <form onSubmit={authKardo}>
            <h1>Health-Hackers</h1>
            <div class="form-group">
              <label for="address">Your Address:</label>
              <input type="text" id="address" name="address" placeholder="Enter Your Address... " value={localStorage.getItem('AuthOwnerHash')} required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Type your password" required />
              <br />
              <br />
            </div>
            <button type="submit">LOGIN</button>
          </form>
        </div>)}
    </div>

  )
}
export default Auth
