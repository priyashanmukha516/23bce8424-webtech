const fs = require('fs');

console.log('Starting file operations...');

// 1. Create new file
fs.writeFile('demo.txt', 'Hello Node.js File System!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
    return;
  }
  console.log('✅ File created successfully');
  
  // 2. Read file contents
  fs.readFile('demo.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('📖 File contents:', data);
    
    // 3. Append data
    fs.appendFile('demo.txt', '\nAppended new line!', (err) => {
      if (err) {
        console.error('Error appending:', err);
        return;
      }
      console.log('➕ Data appended successfully');
      
      // 4. Read updated file
      fs.readFile('demo.txt', 'utf8', (err, updatedData) => {
        if (err) throw err;
        console.log('📖 Updated contents:', updatedData);
        
        // 5. Delete file
        fs.unlink('demo.txt', (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
          console.log('🗑️ File deleted successfully');
          console.log('All file operations completed!');
        });
      });
    });
  });
});