//Memory mapped files

/*  A memory-mapped file is a segment of virtual memory which has been assigned a direct byte-for-byte correlation with some portion of a file or file
Memory mapped files let mongodb delegate the handling of VM to the OS.
Virtual address space is much larger than any physical RAM
an application requests something that’s not currently in RAM it will swap out memory to disk to make space for the newly requested data. 
Most operating systems will do this using a Least Recently Used (LRU) strategy where the oldest data is swapped to disk first. */

  /*working set
    This is the data that your application is constantly requesting. If your “Working Set” all fits in RAM then all access will be 
  fast as the operating system will not have to swap to and from disk as much. However if your “Working Set” does not fit in RAM you 
  suffer performance penalties as the operating system needs to swap one part of your “Working Set” to disk to access another part of it. */
  
  /*Is the working set too big?
    If the number of page faults rapidly increase, then the  working set is bigger than the RAM available
    >   use mydb
    >   db.serverStatus().extra_info.page_faults
    Solutions-
    Increase the RAM or shard the mongodb (splits the working set accross multiple machines) */
  
//Padding

  /*As long as this document growth stays inside the additional padding space MongoDB does not need to move the document to a 
  new bigger space thus avoiding the cost of copying bytes around in memory, and on disk.
  Over time the padding factor that governs how much extra space is appended to a document inserted into MongoDB changes as the 
  database attempts to find the balance between the eventual size of documents and the unused space take up by the padding. */
  
  /* determine padding factor for a specific collection
    >   use mydb
    >   db.my_collection.stats()
    1 means no padding added
    2 means the padding is the same size as the document size. */


//Fragmentation

/* Due to the fact that MongoDB uses memory mapped files any fragmentation on disk will be reflected in fragmentation in RAM as well. 
This has the effect of making less of the “Working Set” fit in RAM and causing more swapping to disk. */

  /* determine fragmentation
    >   use mydb
    >   var s = db.my_collection.stats()
    >   var frag = s.storageSize / (s.size + s.totalIndexSize) */
  
  /* limiting fragmentation
  compact command - rewrite the data and thus remove the fragmentation (only available offline).
  usePowerOf2Sizes - to make MongoDB allocate memory in powers of 2. Wastes space though.
  manual option - model documents to minimize fragmentation doing such things as pre-allocating the max size of a document 
  and ensuring document size growth is managed correctly. */
