// import React, { useEffect } from 'react';
// import uniqid from 'uniqid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


// function FormRow({ circuitBuilderDimensions, id }) {
//     var gridColumn = Array(Math.floor(circuitBuilderDimensions.width / 48)).fill(uniqid())
//   return (
//     <React.Fragment key = {uniqid()}>
//         {
//             gridColumn.map((data, index) => {
//                 return (
//                     <Grid container spacing = {0}  key = { uniqid(data+'-', id) }>
//                         <Item key = {uniqid(index+'-', undefined)}>Test</Item>
//                     </Grid>
//                 )
//             })
//         }
//     </React.Fragment>
//   );
// }

// export default function NestedGrid( { circuitBuilderDimensions } ) {
//     var gridRow = Array(Math.floor(circuitBuilderDimensions.height / 48)).fill(uniqid())

//     useEffect(() => {
//         return;
//     }, [circuitBuilderDimensions]);

//   return (
//     <Box sx={{ flexGrow: 1 }} key = {uniqid()}>
//         {
//             gridRow.map((data, index) => {
//                 return (
//                     <Grid container spacing={0} id = { uniqid(data+'-', index) }>
//                         <FormRow
//                             circuitBuilderDimensions = { circuitBuilderDimensions }
//                             key = {uniqid(index+'-', undefined)}
//                         />
//                     </Grid>
//                 )
//             })
//         }
//     </Box>
//   );
// }