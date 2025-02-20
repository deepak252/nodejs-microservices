console.log(
  new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '_')
    .substring(0, 23)
)
