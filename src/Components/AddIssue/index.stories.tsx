import React from 'react'
import AddIssue from '.'
import {storiesOf} from '@storybook/react'

storiesOf('AddIssue',module)
.add('Opens Correctly',()=>(
    <AddIssue/>
));