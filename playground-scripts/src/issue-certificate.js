const fs = require('fs');
const openCert = require("@govtechsg/open-certificate")

const OPENCERT_EXTENSION = '.opencert'
const ISSUED_CERTS_DIR = '../issued-certs'

// Certs to issue
const certificateToIssue = require('../template-certificate.json') // reading an example certificate file


const issueCertificate = async certificateJson => {
    const recipientName = certificateJson.recipient.name.replace(' ', '')
    const uniqueCertificateName = recipientName + '_' + Date.now() + OPENCERT_EXTENSION
    
    console.log(`Issuing new cert: ${uniqueCertificateName}...`);

    try {
        const issuedCert = openCert.issueCertificate(certificateToIssue)
        await writeFile(`${ISSUED_CERTS_DIR}/${uniqueCertificateName}`, JSON.stringify(issuedCert))
    
        console.log('\nSuccess!\n')
        console.log(issuedCert)
        
    } catch (err) {
        throw new Error(`Error issuing certificate: ${err}`) 
    }
}


const writeFile = (location, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(location, content, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve(location)
            }
        })
    })
} 


// TODO SEND EMAIL OUT
// consider: https://github.com/niftylettuce/email-templates


issueCertificate(certificateToIssue)
