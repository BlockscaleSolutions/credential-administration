const fs = require('fs');
const openCert = require("@govtechsg/open-certificate")
const uuid = require('uuid')

const OPENCERT_EXTENSION = '.opencert'

const COURESE_PREFIX = '../completed-courses'

// args passed in to define which course is being issued for
const pathToCourseFolder = `${COURESE_PREFIX}/${process.argv[2]}`

const certificateTemplate = require(`${pathToCourseFolder}/template-certificate.json`)
const students = require(`${pathToCourseFolder}/students.json`)
const ISSUED_CERTS_DIR = `${COURESE_PREFIX}/${pathToCourseFolder}/issued-certs`


const buildCerts = (certTemplate, students) => {
    let newCert;
    const certs = []

    for (student in students) {
        // update new cert
        newCert = JSON.parse(JSON.stringify(certTemplate))
        newCert.recipient.name = students[student].name
        newCert.recipient.email = students[student].email
        newCert.id = uuid()
        newCert.issuedOn = new Date().toISOString()

        console.log(newCert.issuedOn)
        console.log(newCert.issuedOn)
        console.log(newCert.issuedOn)

        certs.push(newCert)
    }

    return certs
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


const issueCertificates = async certs => {
    let recipientName
    let uniqueCertificateName

    const issuedCerts = openCert.issueCertificates(certs)
    console.log('\nSuccess!\n')
    console.log(issuedCerts)

    // STILL NEED TO GO TO convergence-admin.now.sh to publish this on-chain
    console.log('\nPublish me at https://convergence-admin.now.sh!!!\n')
    console.log(`0x${issuedCerts[0].signature.merkleRoot}`)

    // Write each file for the students
    for (let id in issuedCerts) {
        cert = issuedCerts[id]
        recipientName = cert.data.recipient.name.split(':string:')[1]
        uniqueCertificateName = recipientName + '_' + id + OPENCERT_EXTENSION
        await writeFile(`${ISSUED_CERTS_DIR}/${uniqueCertificateName}`, JSON.stringify(cert))
    }
}

const certs = buildCerts(certificateTemplate, students)
issueCertificates(certs)


// TODO SEND EMAIL OUT
// consider: https://github.com/niftylettuce/email-templates


// issueCertificate(certificateToIssue)
