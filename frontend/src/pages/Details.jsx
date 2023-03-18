import { useState } from 'react'
import Web3 from 'web3'
import { abi, networks } from "../../../build/contracts/ProductVerification.json"
import "../../src/css/auth.css"


// const web3 = new Web3(window.ethereum);
// var account = localStorage.getItem("account");
// var networkId = localStorage.getItem("networkId");

// // const contract = new web3.eth.Contract(abi, networks[networkId].address);
// // console.log(contract);


async function upload(event) {

    var account = localStorage.setItem("account");
    var networkId = localStorage.setItem("networkId");

    const contract = new web3.eth.Contract(abi, networks[networkId].address);
    console.log(contract);
    event.preventDefault();

    // file = event.target[0].files[0];
    // const node = await Ipfs.create()
    // let result = await node.add(file);
    // console.log("File Uploaded Successful");
    // const link = 'https://ipfs.infura.io/ipfs/'+result.path; 
    // console.log(file.name);
    // console.log(userName);

    // contract.methods.addFile(link, file.name, account, userName).send(
    //     {from:account},
    //     (error, result)=>{
    //         console.log(error, result);
    //         window.location.reload();
    //     }
    // );
}

async function logout() {
    localStorage.clear();
    window.location.href = "/";
}





async function addProduct(event){
    returnDetails(event).then((res,err)=>{console.log(res, err);
    })
}

function Details() {
    
    var account = localStorage.getItem("account");
    var networkId = localStorage.getItem("networkId");
    const [check, setcheck] = useState(true);
    const [detail, setdetails] = useState([]);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, networks[networkId].address);
    
    contract.methods.returnSize().call(
        (error, result) => {
            console.log(error, result);
        }
    );

    async function returnDetails(event){
        event.preventDefault();
        var account = localStorage.getItem("account");
        var networkId = localStorage.getItem("networkId");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, networks[networkId].address);
        var index = event.target[0].value;
        const detail = await contract.methods.returnDetails(index).call();
        console.log(detail);
        setcheck(!check);
    }

    async function addProduct(event){
        returnDetails(event).then((res,err)=>{
            setdetails(res);
        })
    }
    
    async function fetchDetails(event){
        const id = event.target[0].value;
        contract.methods.returnDetails().call(
            (error, result) => {
                console.log(error, result);
            }
        );
    }

    return (
        <>
            <div className='container'>
                {check
                ? (
                <form onSubmit={returnDetails}>
                    <h1>Enter Medicine ID</h1>
                    <div class="form-group" style={{margin:0}}>
                        <input type="text" id="id" name="id" placeholder="Enter Medicine ID... " required />
                    </div>
                    <br />
                    <button type="submit">Search</button>
                </form>
                ):(
                <form onSubmit={logout}>
                    {detail.length == 0?(<h1>Add Medicine</h1>):(<h1>Transfer Ownership</h1>)}
                    
                    <div class="form-group">
                        <label for="address">Your Address:</label>
                        <input type="text" id="address" name="address" placeholder="Enter Your Address... " value={localStorage.getItem('AuthOwnerHash')} required />
                    </div>
                    <button type="submit">LOGIN</button>
                </form>
                )}
                
                
                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}
export default Details
