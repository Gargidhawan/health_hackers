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


function Details() {
    
    var account = localStorage.getItem("account");
    var networkId = localStorage.getItem("networkId");
    const [check, setcheck] = useState(true);
    const [detail, setdetails] = useState([]);
    const [medicineID, setmedicineID] = useState(0);
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
        setdetails(detail)
        setcheck(!check);
        setmedicineID(index);   
    }

    async function addProduct(event){
        event.preventDefault();
        const name = event.target[0].value;
        var mfg = event.target[1].value;
        var tfg = event.target[2].value;
        var exg = event.target[3].value;
        const ownerName = event.target[4].value;
        const nln = event.target[5].value;
        const ownerHash = event.target[6].value;
        const mid = event.target[7].value;
        const qr = event.target[8].value;
        console.log(name, mfg, tfg, exg, ownerName, nln, ownerHash, mid, qr);
        mfg = new Date(mfg).getTime()//1440516958
        tfg = new Date(tfg).getTime();//1440516958
        exg = new Date(exg).getTime();//1440516958
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, networks[networkId].address);
        contract.methods.addProduct(name, mfg, tfg, exg, ownerName, nln, mid, qr, ownerHash).send(
            {from:localStorage.getItem("AuthOwnerHash")},
            (error, result) => {
                console.log(error, result);
            }
        );
    }
    
    async function fetchDetails(event){
        const id = event.target[0].value;
        contract.methods.returnDetails().call(
            (error, result) => {
                console.log(error, result);
            }
        );
    }

    function det(l){
        
        var date = new Date(l[1]*1000)
        var date2 = new Date(l[2]*1000)
        var date3 = new Date(l[3]*1000)
        return (
            <div className='order' style={{border:'1px solid black'}}>
                <p>Medicine Name: {l[0]}</p>
                <p>Manufacturing Date: {""+date}</p>
                <p>Transfer Date: {""+date2}</p>
                <p>Expiry Date: {""+date3}</p>
                <p>Owner Name: {l[4]}</p>
                <p>License Number: {l[5]}</p>
                <p>Owner Hash: {l[6]}</p>
            </div>
        )
    }

    return (
        <>
            <div className='container'>
                {check
                ?(
                <form onSubmit={returnDetails}>
                    <h1>Enter Medicine ID</h1>
                    <div class="form-group" style={{margin:0}}>
                        <input type="text" id="id" name="id" placeholder="Enter Medicine ID... " required />
                    </div>
                    <br />
                    <button type="submit">Search</button>
                </form>
                ):(
                <div>
                {detail.map(det)}
                <form onSubmit={addProduct}>
                    {detail.length == 0?(<h1>Add Medicine</h1>):(<h1>Transfer Ownership</h1>)}
                    
                    <div class="form-group">
                        <label for="address">Medicine Name:</label>
                        <input type="text" id="med_name" name="med_name" placeholder="Enter the name of the medicine" required/>
                    </div>
                    <div class="form-group">
                        <label for="mfg">Manufacturing Date:</label>
                        <input type="date" id="mfg" name="mfg" placeholder="Enter the manufacturing date..."required />
                    </div>
                    <div class="form-group">
                        <label for="tfg">Transfer Date:</label>
                        <input type="date" id="tfg" name="tfg" placeholder="Enter the Transfer Ownership Date..." required />
                    </div>
                    <div class="form-group">
                        <label for="exg">Expiry Date:</label>
                        <input type="date" id="exg" name="exg" placeholder="Enter the Expiry Date..." required />
                    </div>
                    <div class="form-group">
                        <label for="ownerName">Owner Name:</label>
                        <input type="text" id="ownerName" name="ownerName" placeholder="Enter Owner Name... " required />
                    </div>
                    <div class="form-group">
                        <label for="nln">Owner License Number:</label>
                        <input type="text" id="nln" name="nln" placeholder="Current Owner License Number... " required />
                    </div>
                    <div class="form-group">
                        <label for="ownerHash">Current Owner Address:</label>
                        <input type="text" id="ownerHash" name="ownerHash" placeholder="Current Owner Address... " value={localStorage.getItem("AuthOwnerHash")} required />
                    </div>
                    <div class="form-group">
                        <label for="mid">MedicineID:</label>
                        <input type="text" id="mid" name="mid" placeholder="Enter Medicine ID... " value={medicineID} required />
                    </div>
                    <div class="form-group">
                        <label for="qr">QRCode:</label>
                        <input type="text" id="qr" name="qr" placeholder="Enter QR Code... " required />
                    </div>
                    <br />
                    <button type="submit">LOGIN</button>
                </form>
                </div>
                )}
            </div>
        </>
    )
}
export default Details
