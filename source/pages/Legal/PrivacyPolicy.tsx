import { Button, Container, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Container
      sx={{
        color: '#fff',
        pt: 3,
        '& ol': { listStylePosition: 'inside', pl: 0 },
        '& ol ol li': { pl: 2 },
        '& ol > li.MuiTypography-h4': { pt: 1 },
        '& ol > li.MuiTypography-h4 > .css-1alraq5-MuiTypography-root:first-of-type': { mt: 1 },
        '& p': { py: 0.5 },
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h2">Altlayer Privacy Policy</Typography>
        <Typography component="p">
          We recognise our responsibilities in relation to the collection, holding, processing, use
          and/or transfer of personal data. Your privacy is of utmost importance to us.
        </Typography>
        <Typography component="p">
          This policy (the <strong>Policy</strong>) outlines how we collect, use, store and disclose
          your personal data. Please take a moment to read about how we collect, use and/or disclose
          your personal data so that you know and understand the purposes for which we may collect,
          use and/or disclose your personal data. By accessing the website at https://altlayer.io/
          (the <strong>Website</strong>), you agree and consent to AltLayer (the{' '}
          <strong>Company</strong>), its related corporations, business units and affiliates, as
          well as their respective representatives and/or agents (collectively referred to herein as{' '}
          <strong>AltLayer, us, we</strong> or <strong>our</strong>), collecting, using, disclosing
          and sharing amongst themselves the personal data, and to disclosing such personal data to
          relevant third party providers. This Policy supplements but does not supersede nor replace
          any other consent which you may have previously provided to us nor does it affect any
          rights that we may have at law in connection with the collection, use and/or disclosure of
          your personal data. We may from time to time update this Policy to ensure that this Policy
          is consistent with our future developments, industry trends and/or any changes in legal or
          regulatory requirements. Subject to your rights at law, the prevailing terms of this
          Policy shall apply. For the avoidance of doubt, this Policy forms part of the terms and
          conditions governing your relationship with us and should be read in conjunction with such
          terms and conditions.
        </Typography>
        <Typography component="p">
          The security of your personal data is important to us. At each stage of data collection,
          use and disclosure, AltLayer has in place physical, electronic, administrative and
          procedural safeguards to protect the personal data stored with us. However, do note that
          no transmission of personal data over the internet can be guaranteed to be 100% secure -
          accordingly and despite our efforts, AltLayer cannot guarantee or warrant the security of
          any information you transmit to us, or to or from our online services. AltLayer shall not
          have any responsibility or liability for the security of information transmitted via the
          internet.
        </Typography>
        <Typography component="p">
          This Policy describes how AltLayer may collect, use, disclose, process and manage your
          personal data, and applies to any individual&apos;s personal data which is in our
          possession or under our control.
        </Typography>
        <Typography component="ol" sx={{ '& .MuiTypography-h4': { mt: 1 } }}>
          <Typography component="li" variant="h4">
            What personal data is collected by AltLayer
            <Typography component="p">
              &quot;Personal data&quot; means data, whether true or not, about an individual who can
              be identified (i) from that data, or (ii) from that data and other information to
              which the organisation has or is likely to have access. Some examples of personal data
              that AltLayer may collect are:
            </Typography>
            <Typography component="p">
              <ol type="a">
                <li>
                  personal particulars (e.g. name, alias(es), gender, contact details, residential
                  address, date of birth, identity card/passport details, social media handles and
                  other social media profile information, and/or education details);
                </li>
                <li>
                  financial details (e.g. income, wealth, source of funds/wealth and bank
                  information);
                </li>
                <li>
                  images and voice/video recordings of our conversations with you, whether from our
                  communication channels, events or office surveillances or otherwise;
                </li>
                <li>
                  work experience and employment details (e.g. designation, occupation,
                  directorships and other positions held, employment history, salary, and/or
                  benefits);
                </li>
                <li>specimen signature(s);</li>
                <li>tax and insurance information;</li>
                <li>
                  information about your investments, investment objectives, knowledge and
                  experience and/or business interests and assets;
                </li>
                <li>information about your use of our services and Website;</li>
                <li>
                  usernames and password, third party account credentials (such as your Facebook
                  login credentials, Google login credentials) and IP address;
                </li>
                <li>
                  browser type and version, pages visited, time and date of your visit, time spent
                  on each page, and other diagnostic data;
                </li>
                <li>banking information (e.g. account numbers and banking transactions);</li>
                <li>information or details regarding digital assets held;</li>
                <li>
                  public cryptographic key relating to addresses on distributed ledger networks
                  and/or similar information; and/or
                </li>
                <li>personal opinions made known to us (e.g. feedback or responses to surveys).</li>
              </ol>
            </Typography>
            <Typography component="p">
              Personal data may be collected when you interact with our services or use the Website,
              or may be received by AltLayer from third-party databases or service providers that
              provide business information.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Purposes for collection, use and disclosure of your personal data
            <Typography component="p">
              AltLayer may collect, use and/or disclose your personal data for its business
              purposes, including operations for these purposes. These may include, without
              limitation, the following:
            </Typography>
            <Typography component="p">
              <ol type="a">
                <li>
                  developing and providing facilities, products or services (whether made available
                  by us or through us) or your participation in interactive features of our
                  services, including without limitation:
                  <Typography component="ol" my={1} type="i">
                    <li>sale and purchase of digital tokens or virtual currencies;</li>
                    <li>
                      acting as intermediaries through any blockchain, network or platform developed
                      or managed by us;
                    </li>
                    <li>
                      recording and/or encryption on any blockchain, network or platform developed
                      or managed by us;
                    </li>
                    <li>
                      promoting advertisements or marketing material, whether from us or third
                      parties;
                    </li>
                    <li>
                      various products and/or services (whether digital or not, and whether provided
                      through an external service provider or otherwise);
                    </li>
                    <li>
                      providing, managing or accessing digital wallets for holding digital assets;
                    </li>
                    <li>
                      making payments for participation in any blockchain, network or platform
                      developed or managed by us (as applicable);
                    </li>
                    <li>
                      services for purchasing, trading and/or usage of computing resources or
                      otherwise relating to computing infrastructure;
                    </li>
                    <li>
                      various products and/or services related to computing infrastructure or
                      digital assets;
                    </li>
                    <li>
                      any escrow, courier, anti-counterfeiting or dispute resolution services;
                    </li>
                    <li>transactions and clearing or reporting on these transactions;</li>
                    <li>carrying out research, planning and statistical analysis; and/or</li>
                    <li>
                      analytics for the purposes of developing or improving our products, services,
                      security, service quality, staff training, and advertising strategies;
                    </li>
                  </Typography>
                </li>
                <li>
                  assessing and processing applications, instructions, transactions, or requests
                  from you or our customers;
                </li>
                <li>
                  communicating with you, including providing you with updates on changes to
                  services or products (whether made available by us or through us) including any
                  additions, expansions, suspensions and replacements of or to such services or
                  products and their terms and conditions;
                </li>
                <li>
                  managing our infrastructure and business operations and complying with internal
                  policies and procedures;
                </li>
                <li>responding to queries or feedback;</li>
                <li>
                  addressing or investigating any complaints, claims or disputes in connection with
                  the services;
                </li>
                <li>
                  verifying your identity for the purposes of providing facilities, products or
                  services, which would require comparison of your personal information against
                  third party databases and/or provision of such information to third party service
                  providers;
                </li>
                <li>
                  conducting credit checks, screenings or due diligence checks as may be required
                  under applicable law, regulation or directive;
                </li>
                <li>
                  complying with all applicable laws, regulations, rules, directives, orders,
                  instructions and requests from any local or foreign authorities, including
                  regulatory, governmental, tax and law enforcement authorities or other
                  authorities;
                </li>
                <li>monitoring products and services provided by or made available through us;</li>
                <li>
                  financial reporting, regulatory reporting, management reporting, risk management
                  (including monitoring credit exposures, preventing, detecting and investigating
                  crime, including fraud and any form of financial crime), audit and record keeping
                  purposes;
                </li>
                <li>
                  enabling any actual or proposed assignee or transferee, participant or
                  sub-participant of AltLayer&apos;s rights or obligations to evaluate any proposed
                  transaction;
                </li>
                <li>
                  enforcing obligations owed to us, protecting our rights or property, and
                  protecting against legal liability; and/or
                </li>
                <li>seeking professional advice, including legal or tax advice.</li>
              </ol>
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            eKYC
            <Typography component="p">
              AltLayer may engage and authorise certain third party service providers of electronic
              know-your-client (<strong>eKYC</strong>) services for identity verification,
              processing of identity documentation, collection of due diligence documentation,
              and/or transaction monitoring.
            </Typography>
            <Typography component="p">
              Under these arrangements, personal data may be provided to such eKYC service providers
              through the submission of information, forms, documents or media files (in whatever
              format) through an upload to online platforms operated by such eKYC service providers.
              The eKYC process may be automated, semi-automated or performed by a human.
            </Typography>
            <Typography component="p">
              The result of the eKYC process as well as all personal data provided to eKYC service
              providers will be made available solely to AltLayer and will not be shared with any
              other external parties. All eKYC service providers shall be required to ensure that
              the eKYC solution is secure and robust to protect personal data from unauthorised
              access, use and disclosure at all times.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Use of personal data for marketing purposes
            <Typography component="p">
              We may use your personal data to offer you products or services, including special
              offers, promotions, contests or entitlements that may be of interest to you or for
              which you may be eligible. Such marketing messages may be sent to you in various modes
              including but not limited to electronic mail, direct mailers, short message service,
              telephone calls, facsimile and other mobile messaging services. In doing so, we will
              comply with all applicable data protection and privacy laws.
            </Typography>
            <Typography component="p">
              In respect of sending telemarketing messages to your telephone number via short
              message service, telephone calls, facsimile and other mobile messaging services,
              please be assured that we shall only do so if we have your clear and unambiguous
              consent in writing or other recorded form to do so or if you have not otherwise made
              the appropriate registration of that number with the Do Not Call Registry. If we have
              an ongoing relationship with you and you have not indicated to us that you do not wish
              to receive telemarketing messages sent to your telephone number, we may send you
              telemarketing messages to that number related to the subject of our ongoing
              relationship via short message service, facsimile and other mobile messaging services
              (other than a voice or video call).
            </Typography>
            <Typography component="p">
              You may at any time request that we stop contacting you for marketing purposes via
              selected or all modes.
            </Typography>
            <Typography component="p">
              To find out more on how you can change the way we use your personal data for marketing
              purposes, please contact us.
            </Typography>
            <Typography component="p">
              Nothing in this section 4 shall vary or supersede the terms and conditions that govern
              our relationship with you.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Disclosure and sharing of personal data
            <Typography component="p">
              We may from time to time and in compliance with all applicable laws on data privacy,
              disclose your personal data to any personnel of AltLayer, group entities, or to third
              parties (including without limitation banks, financial institutions, credit card
              companies, credit bureaus and their respective service providers, companies providing
              services relating to insurance and/or reinsurance to us, and associations of insurance
              companies, agents, contractors or third party service providers who provide services
              to us such as telecommunications, information technology, payment, data processing,
              storage and archival, and our professional advisers such as our auditors and lawyers,
              and regulators and authorities), located in any jurisdiction, in order to carry out
              the purposes set out above. Please be assured that when we disclose your personal data
              to such parties, we require them to ensure that any personal data disclosed to them
              are kept confidential and secure.
            </Typography>
            <Typography component="p">
              For more information about the third parties with whom we share your personal data,
              you may, where appropriate, wish to refer to the agreement(s) and/or terms and
              conditions that govern our relationship with you or our customer. You may also contact
              us for more information (please see section 9 below).
            </Typography>
            <Typography component="p">
              We wish to emphasise that AltLayer does not sell personal data to any third parties
              and we shall remain fully compliant of any duty or obligation of confidentiality
              imposed on us under the applicable agreement(s) and/or terms and conditions that
              govern our relationship with you or our customer or any applicable law.
            </Typography>
            <Typography component="p">
              You are responsible for ensuring that the personal data you provide to us is accurate,
              complete, and not misleading and that such personal data is kept up to date. You
              acknowledge that failure on your part to do so may result in our inability to provide
              you with the products and services you have requested. To update your personal data,
              please contact us (please see section 9 below for contact details). Where you provide
              us with personal data concerning individuals other than yourself, you are responsible
              for obtaining all legally required consents from the concerned individuals and you
              shall retain proof of such consent(s), such proof to be provided to us upon our
              request.
            </Typography>
            <Typography component="p">
              We may transfer, store, process and/or deal with your personal data in any
              jurisdiction, and accordingly such personal data may be transferred to computers,
              servers or hardware located outside of your state, province, country or other
              governmental jurisdiction where the data protection laws may differ from those in your
              jurisdiction. AltLayer will take all steps reasonably necessary to ensure that your
              data is treated securely and in accordance with this Policy and no transfer of your
              personal data will take place to an organisation or a country unless there are
              adequate controls in place including the security of your data and other personal
              information. Your consent to this Policy followed by your submission of such
              information represents your agreement to the transfer of personal data as described
              herein.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Cookies and related technologies
            <Typography component="p">
              The Website uses cookies. A cookie is a small text file placed on your computer or
              mobile device when you visit a Website or use an app, which may include an anonymous
              unique identifier. Cookies collect information about users and their visit to the
              Website or use of the app, such as their Internet protocol (IP) address, how they
              arrived at the Website (for example, through a search engine or a link from another
              Website), how they navigate within the Website or app, browser information, computer
              or device type, operating system, internet service provider, website usage,
              referring/exit pages, platform type, date/time stamp, number of clicks, and ads
              viewed. We use cookies and other technologies to facilitate your internet sessions and
              use of our apps, offer you products and/or services according to your preferred
              settings, track use of our websites and apps, to compile statistics about activities
              carried out on our websites, and to hold certain information. Examples of cookies
              which we use include, without limitation, Session Cookies to operate our service,
              Preference Cookies to remember your preferences and various settings, as well as
              Security Cookies for security purposes.
            </Typography>
            <Typography component="p">
              You may set up your web browser to block cookies from monitoring your website visit.
              You may also remove cookies stored from your computer or mobile device. However, if
              you do block cookies you may not be able to use certain features and functions of our
              web sites.
            </Typography>
            <Typography component="p">
              We further utilise a variety of other similar tracking technologies, including without
              limitation beacons, tags, and scripts to collect and track information and to improve
              and analyse our services.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Other web sites
            <Typography component="p">
              Our websites may contain links to other websites which are not maintained by AltLayer.
              This Policy only applies to the websites of AltLayer. When visiting these third party
              websites, you should read their privacy policies which will apply to your use of such
              websites.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Retention of personal data
            <Typography component="p">
              Your personal data is retained as long as the purpose for which it was collected
              remains and until it is no longer necessary for any legal or business purposes. This
              enables us to comply with legal and regulatory requirements or use it where we need to
              for our legitimate purposes, such as transfers of digital assets, and dealing with any
              disputes or concerns that may arise.
            </Typography>
            <Typography component="p">
              We may need to retain information for a longer period where we need the information to
              comply with regulatory or legal requirements or where we may need it for our
              legitimate purposes (e.g. to help us respond to queries or complaints, fighting fraud
              and financial crime, responding to requests from regulators etc).
            </Typography>
            <Typography component="p">
              When we no longer need to use personal information, we will remove it from our systems
              and records and/or take steps to anonymise it so that you can no longer be identified
              from it.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Queries, Access/Correction Requests and Withdrawal of Consent
            <Typography component="p">If you:</Typography>
            <Typography component="p">
              <ol type="a">
                <li>have queries about our data protection processes and practices;</li>
                <li>
                  wish to request access to and/or make corrections to your personal data in our
                  possession or under our control; or
                </li>
                <li>
                  wish to withdraw your consent to our collection, use or disclosure of your
                  personal data,
                </li>
              </ol>
            </Typography>
            <Typography component="p">
              please submit a written request (with supporting documents, (if any) to our Data
              Protection Officer at: privacy@altresear.ch. Our Data Protection Officer shall
              endeavour to respond to you within 30 days of your submission. Please note that if you
              withdraw your consent to any or all use or disclosure of your personal data, depending
              on the nature of your request, we may not be in a position to continue to provide our
              services or products to you or administer any contractual relationship in place. Such
              withdrawal may also result in the termination of any agreement you may have with us.
              Our legal rights and remedies are expressly reserved in such event.
            </Typography>
            <Typography component="p">
              We may charge you a fee for processing your request for access. Such a fee depends on
              the nature and complexity of your access request. Information on the processing fee
              will be made available to you.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Contact information
            <Typography component="p">
              To contact us on any aspect of this Policy or your personal data or to provide any
              feedback that you may have, please contact our Data Protection Officer at
              privacy@altresear.ch.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Governing Law and Jurisdiction
            <Typography component="p">
              This Policy and your use of the Website shall be governed and construed in accordance
              with the laws of Singapore. You agree to submit to the exclusive jurisdiction of the
              Singapore courts.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Amendments and updates to AltLayer Privacy Policy
            <Typography component="p">
              We reserve the right to amend this Policy from time to time to ensure that this Policy
              is consistent with any developments to the way AltLayer uses your personal data or any
              changes to the laws and regulations applicable to AltLayer. We will make available the
              updated Policy on the Website. You are encouraged to visit the Website from time to
              time to ensure that you are well informed of our latest policies in relation to
              personal data protection. All communications, transactions and dealings with us shall
              be subject to the latest version of this Policy in force at the time.
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            For European Union or European Economic Area Residents
            <Typography component="p">
              This section 12 applies if you are an individual located in the European Union or
              European Economic Area. Subject to applicable law, you have the following additional
              rights in relation to your personal data:
            </Typography>
            <Typography component="p">
              <ol type="a">
                <li>
                  the right to access your personal data (if you ask us, we will confirm whether we
                  are processing your personal data in a structured, commonly used and
                  machine-readable format and, if so, provide you with a copy of that personal data
                  (along with certain other details). If you require additional copies, we may need
                  to charge a reasonable fee;
                </li>
                <li>the right to ensure the accuracy of your personal data;</li>
                <li>
                  the right to have us delete your personal data (we will do so in some
                  circumstances, such as where we no longer need it, but do note that we may not
                  delete your data when other interests outweigh your right to deletion);
                </li>
                <li>
                  the right to restrict further processing of your personal data (unless we
                  demonstrate compelling legitimate grounds for the processing);
                </li>
                <li>
                  rights in relation to automated decision-making and profiling (you have the right
                  to be free from decisions based solely on automated processing of your personal
                  data, including profiling, that affect you, unless such processing is necessary
                  for entering into, or the performance of, a contract between you and us or you
                  provide your explicit consent to such processing);
                </li>
                <li>
                  the right to withdraw consent (if we rely on your consent to process your personal
                  data, you have the right to withdraw that consent at any time, but provided always
                  that this shall not affect the lawfulness of processing based on your prior
                  consent); and
                </li>
                <li>
                  the right to complain to a supervisory authority in your country of residence in
                  the event that data is misused.
                </li>
              </ol>
            </Typography>
            <Typography component="p">
              If you believe that our processing of your personal information infringes data
              protection laws, you have a legal right to lodge a complaint with a supervisory
              authority responsible for data protection. You may do so in the EU member state of
              your residence, your place of work or the place of the alleged infringement. You may
              exercise any of your rights in relation to your personal data by contacting our Data
              Protection Officer at: privacy@altresear.ch
            </Typography>
          </Typography>
          <Typography component="li" variant="h4">
            Your acceptance of these terms
            <Typography component="p">
              This Policy applies in conjunction with any other notices, contractual clauses and
              consent clauses that apply in relation to the collection, use and disclosure of your
              personal data by us. We may revise this Policy from time to time without any prior
              notice. You may determine if any such revision has taken place by referring to the
              date on which this Policy was last updated.
            </Typography>
            <Typography component="p">
              By using the Website and/or any services provided by AltLayer, you signify your
              acceptance of this Policy and terms of service. If you do not agree to this Policy or
              terms of service, please do not use the Website or any services provided by AltLayer.
              Your continued use of the Website following the posting of changes to this Policy will
              be deemed your acceptance of those changes.
            </Typography>
          </Typography>
        </Typography>

        <Typography pt={5} variant="h4">
          Last updated: [18 July 2022]
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" my={3}>
        <Button
          component={NavLink}
          fullWidth
          sx={{ textTransform: 'none' }}
          to="/deposit"
          variant="contained"
        >
          Back to home
        </Button>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;
