import React, { Component } from 'react';

class AddBundleLeftSection extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <p>Window here where they can see the bundle created and how it looks, it updates as they make selections and edits in the left side of this and it stays  in this position relative to when they scroll the menu on the right so it’s always central position here no matter the scroll motion on the right.  From the moment they hover over a type of bundle they see an example image otherwise the default is a gif showing both bundle styles and the “Choose your bundle type” option above is animated to draw the attention there to have them choose something.
                            </p><p>
                                Idea! - if possible people may hover over the preview here and they can get text suggestion on where can edit that part in the left menu with the option to click on that and take them directly to that section in the right side options list</p>
                            <p>On this page when you coming here from the Edit Bundle option you will have the settings already shown here from when you created the bundle and you are just able to edit anything you want - save automaticaly - maybe have a save button as well ?! </p>
            </React.Fragment>
         );
    }
}
 
export default AddBundleLeftSection;