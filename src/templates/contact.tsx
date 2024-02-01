import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { CSSProperties } from 'react';
import projectConfig from '~/lib/project.config';
import { ContactForms } from '~/schema';

const styles = {
  main: {
    backgroundColor: '#ffffff',
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
    maxWidth: '100%',
  },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#484848',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.4',
    color: '#484848',
  },
  review: {
    fontSize: '18px',
    lineHeight: '1.4',
    color: '#484848',
    padding: '24px',
    backgroundColor: '#f2f3f3',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#ff5a5f',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '18px',
    paddingTop: '19px',
    paddingBottom: '19px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    width: '100%',
  },
  hr: {
    borderColor: '#cccccc',
    margin: '20px 0',
  },
} satisfies Record<string, CSSProperties>;

interface IEmailContact extends ContactForms {}

export const EmailContact = ({ name, email, message }: IEmailContact) => {
  const dryrun = process.env.NODE_ENV !== 'production';

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{`You've received a message from ${name}`}</Preview>

      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={{ paddingBottom: '20px' }}>
            <Row>
              {dryrun && <Text style={styles.heading}>this is a dryrun</Text>}

              <Text style={styles.heading}>{`Here's what ${name} wrote`}</Text>

              <Text style={styles.review}>{message}</Text>

              <Text style={{ ...styles.paragraph, paddingBottom: '16px' }}>
                Click the button below to email them.
              </Text>

              <Button style={styles.button} href={`mailto:${email}`}>
                Reply them
              </Button>
            </Row>
          </Section>

          <Hr style={styles.hr} />

          <Section>{projectConfig.name}</Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailContact;
