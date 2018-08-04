import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native';
import styles from './styles'
import colors from '../../data/colors'

/** 
 * Component that displays information about tuberculosis for the patient (won't be visible to doctor).  
 */

export default class AboutTBComp extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.h1}>What is Tuberculosis?</Text>
                <Text style={styles.paragraph}>
                    Tuberculosis (TB) is an airborne disease that typically affects the lungs, but it may also spread to 
                    the spine and/or the brain.
                    There are two types of TB: Latent TB, and Active TB.
                </Text>
                <Text style={styles.h2}>Latent TB</Text>
                <Text style={styles.paragraph}>
                    You have the germs in your body, but your immune system stops them from spreading. That means you don’t 
                    have any symptoms and you’re not contagious. However, the infection is still alive in your body and 
                    can one day become active. If you are at high risk for re-activation your doctor will treat you with 
                    antibiotics to lower the risk of developing active TB.
                </Text>
                <Text style={styles.h2}>Active TB</Text>
                <Text style={styles.paragraph}>
                    This means the germs multiply and actually make you sick. The germs may spread the disease to other parts of your body. 
                </Text>
                <Text style={styles.h1}>Symptoms of TB</Text>
                <Text style={styles.paragraph}>
                    There aren't any symptoms for latent TB - which is why we administer this skin test.
                    As for active TB, sypmtoms include: coughs that last more than 3 weeks, chest pain, coughing up blood,
                    loss of appetite, night sweats, fever, among others.
                    If you experience chest pains, seek medical attention right away.
                </Text>
                <Text style={styles.h1}>About the skin test</Text>
                <Text style={styles.paragraph}>
                    The tuberculin test is used to determine if someone has developed an immune response to the bacterium that causes TB.
                    The standard recommended tuberculin test is the Mantoux test, which is administered by injecting a 0.1 mL of 
                    liquid containing 5 TU (tuberculin units) of PPD (purified protein derivative) into the top layers of skin of the forearm.
                    After 48 to 72 hours, the skin test is read. The basis of reading the skin test is the presence (or absence) and size of
                    of the induration (the bump). Your doctor, using the size of the bump (which is the largest diameter of the bump) and 
                    his knowledge of your medical history, determines whether you have TB or not.
                </Text>
                <Text style={styles.h2}>What if I test positive for TB?</Text>
                <Text style={styles.paragraph}>
                    If you have tested positive for TB, your doctor will let you know through our app by asking you to make an appointment
                    where s/he will advise you on the best course of action and possible treatment. 
                </Text>
                <Text style={[styles.h2, {marginBottom: 20, fontSize: 20}]}>Don't hesitate to consult a doctor if you have any questions about your case or TB in general.</Text>
            </ScrollView>
        ) 
    }
  }

  