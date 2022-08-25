const SUBJKEY_OLD: { [index: string]: string } = {
  // Keywords
  SPARE: 'SPARE',
  DISMISSED: 'DISMISSED',

  // Humanities
  'English Language Arts 10-1 (IB)': 'ELA10IB',
  'English Language Arts 20-1': 'ELA20',
  'English Language Arts 20-1 (IB)': 'ELA20IB',
  'English Language Arts 30-1': 'ELA30',
  'English Language Arts 30-1 (IB)': 'ELA30IB',
  'English Literature 35 (IB)': 'ELA35IB',
  'Social Studies 10-1 (IB)': 'SS10IB',
  'Social Studies 20-1': 'SS20',
  'Social Studies 20-1 (IB)': 'SS20IB',
  'Social Studies 30-1': 'SS30',
  'Social Studies 30-1 (IB)': 'SS30IB',
  'International Politics 35 (IB)': 'SS35IB',
  'Unscheduled D': 'SD15',
  'Speech & Debate 15': 'SD15',
  'Speech & Debate 25': 'SD25',
  'Speech & Debate 35': 'SD35',
  'Theory of Knowledge 25 (IB)': 'TOK25IB',
  'Theory of Knowledge 35 (IB)': 'TOK35IB',
  'Theory Of Knowledge 25 (IB)': 'TOK25IB',
  'Theory Of Knowledge 35 (IB)': 'TOK35IB',

  // STEM
  'Mathematics 10C (IB)': 'MATH10IB',
  'Mathematics 20-1 (IB)': 'MATH20IB',
  'Mathematics 30-1': 'MATH30',
  'Mathematics 30-1 (IB)': 'MATH30IB',
  'Mathematics 31': 'MATH31',
  'Mathematics 31 (IB)': 'MATH31IB',
  'Science 10 (IB)': 'SCI10IB',
  'Introductory Inf Processing': 'CSEC10',
  'Intermediate Inf Processing': 'CSEC20',
  'Advanced Inf Processing': 'CSEC30',
  'Introductory Networking': 'NET10',
  'Intermediate Networking': 'NET20',
  'Advanced Networking': 'NET30',
  'Introductory Computing Science': 'CS10',
  'Introductory Computing Science (IB)': 'CS20',
  'Intermediate Computing Science': 'CS20',
  'Advanced Computing Science': 'CS30',
  'Chemistry 20 (IB)': 'CHEM20IB',
  'Chemistry 30': 'CHEM30',
  'Chemistry 30 (IB)': 'CHEM30IB',
  'Chemistry 35 (IB)': 'CHEM35IB',
  'Biology 20 (IB)': 'BIO20IB',
  'Biology 30': 'BIO30',
  'Biology 30 (IB)': 'BIO30IB',
  'Biology 35 (IB)': 'BIO35IB',
  'Physics 20 (IB)': 'PHYS20IB',
  'Physics 35 (IB)': 'PHYS35IB',
  'Physics 30': 'PHYS30',
  'Physics 30 (IB)': 'PHYS30IB',

  // French
  'French-9Y 10 (IB)': 'FR10IB',
  'French-9Y 20 (IB)': 'FR20IB',
  'French-9Y 30 (IB)': 'FR30IB',

  // Arts
  'Art 10': 'ART10',
  'Art 20': 'ART20',
  'Art 20 (IB)': 'ART20IB',
  'Art 30': 'ART30',
  'Art 30 (IB)': 'ART30IB',
  'Drama 10': 'DRMA10',
  'General Music 10': 'GM10IB',
  'Instrumental Music 10': 'BAND10',
  'Instrumental Music 20': 'BAND20',
  'Instrumental Music 20 (IB)': 'BAND20IB',
  'Instrumental Music 30': 'BAND30',
  'Instrumental Music 30 (IB)': 'BAND30IB',

  // Other
  'Career & Life Management Program': 'CALM20',
  'Introductory Team Leadership': 'LD15',
  'Intermediate Team Leadership': 'LD25',
  'Advanced Team Leadership': 'LD35',
  'Physical Education 10': 'PE10',
};

const SUBJKEY: { [index: string]: string } = {
  // ATTENTION: IB and AP COURSES MUST GO BEFORE REGULAR COURSES

  // Keywords
  SPARE: 'SPARE',
  DISMISSED: 'DISMISSED',

  // Humanities
  'English Language Arts 10-1 (IB)': 'ELA10IB',
  'English Language Arts 20-1 (IB)': 'ELA20IB',
  'English Language Arts 30-1 (IB)': 'ELA30IB',
  'English Literature 35 (IB)': 'ELA35IB',
  'English Literature 35': 'ELA35IB',
  'English Language Arts 10-1': 'ELA10',
  'English Language Arts 20-1': 'ELA20',
  'English Language Arts 30-1': 'ELA30',
  'English Language Arts 10-2': 'ELA102',
  'English Language Arts 20-2': 'ELA202',
  'English Language Arts 30-2': 'ELA302',
  'Creative Writing 15': 'CRWR15',
  'Creative Writing 25': 'CRWR25',
  'Creative Writing 35': 'CRWR35',
  'Social Studies 10-1 (IB)': 'SS10IB',
  'Social Studies 20-1 (IB)': 'SS20IB',
  'Social Studies 30-1 (IB)': 'SS30IB',
  'International Politics 35 (IB)': 'SS35IB',
  'International Politics 35': 'SS35IB',
  'Social Studies 10-1': 'SS10',
  'Social Studies 20-1': 'SS20',
  'Social Studies 30-1': 'SS30',
  'Social Studies 10-2': 'SS102',
  'Social Studies 20-2': 'SS202',
  'Social Studies 30-2': 'SS302',
  'Aboriginal Studies 30': 'ABS30',
  'Unscheduled D': 'SD15',
  'Speech & Debate 15': 'SD15',
  'Speech & Debate 25': 'SD25',
  'Speech & Debate 35': 'SD35',
  'Theory of Knowledge 25 (IB)': 'TOK25IB',
  'Theory of Knowledge 35 (IB)': 'TOK35IB',
  'Theory Of Knowledge 25': 'TOK25IB',
  'Theory Of Knowledge 35': 'TOK35IB',

  // STEM
  'Mathematics 10C (IB)': 'MATH10IB',
  'Mathematics 20-1 (IB)': 'MATH20IB',
  'Mathematics 30-1 (IB)': 'MATH30IB',
  'Mathematics 31 (IB)': 'MATH31IB',
  'Mathematics 10C': 'MATH10',
  'Mathematics 20-1': 'MATH20',
  'Mathematics 30-1': 'MATH30',
  'Mathematics 31': 'MATH31',
  'Mathematics 15': 'MATH15',
  'Mathematics 20-2': 'MATH202',
  'Mathematics 30-2': 'MATH302',
  'Mathematics 10-3': 'MATH103',
  'Mathematics 20-3': 'MATH203',
  'Mathematics 30-3': 'MATH303',
  'Science 10 (IB)': 'SCI10IB',
  'Science 10': 'SCI10',
  'Science 14': 'SCI14',
  'Science 24': 'SCI24',
  'Science 20': 'SCI20',
  'Science 30': 'SCI30',
  'Forensic Studies 25': 'FRSC25',
  'Forensic Studies 35': 'FRSC35',
  'Introductory Inf Processing': 'CSEC10',
  'Intermediate Inf Processing': 'CSEC20',
  'Advanced Inf Processing': 'CSEC30',
  'Introductory Networking': 'NET10',
  'Intermediate Networking': 'NET20',
  'Advanced Networking': 'NET30',
  'Introductory Computing Science (IB)': 'CS10IB',
  'Intermediate Computing Science (IB)': 'CS20IB',
  'Advanced Computing Science (IB)': 'CS30IB',
  'Networking 20 (IB)': 'NET20IB',
  'Networking 20': 'NET20IB',
  'Introductory Computing Science': 'CS10',
  'Intermediate Computing Science': 'CS20',
  'Advanced Computing Science': 'CS30',
  'Chemistry 20 (IB)': 'CHEM20IB',
  'Chemistry 30 (IB)': 'CHEM30IB',
  'Chemistry 35 (IB)': 'CHEM35IB',
  'Chemistry 20': 'CHEM20',
  'Chemistry 30': 'CHEM30',
  'Biology 20 (IB)': 'BIO20IB',
  'Biology 30 (IB)': 'BIO30IB',
  'Biology 35 (IB)': 'BIO35IB',
  'Biology 35': 'BIO35IB',
  'Biology 20': 'BIO20',
  'Biology 30': 'BIO30',
  'Physics 20 (IB)': 'PHYS20IB',
  'Physics 35 (IB)': 'PHYS35IB',
  'Physics 30 (IB)': 'PHYS30IB',
  'Physics 20': 'PHYS20',
  'Physics 35': 'PHYS35IB',
  'Physics 30': 'PHYS30',

  // Languages
  'French-9Y 10 (IB)': 'FR10IB',
  'French-9Y 20 (IB)': 'FR20IB',
  'French-9Y 30 (IB)': 'FR30IB',
  'French-9Y 10': 'FR10',
  'French-9Y 20': 'FR20',
  'French-9Y 30': 'FR30',
  'Chinese-9Y 10 (IB)': 'CHN910IB',
  'Chinese-9Y 20 (IB)': 'CHN920IB',
  'Chinese-9Y 30 (IB)': 'CHN930IB',
  'Chinese-9Y 10': 'CHN910',
  'Chinese-9Y 20': 'CHN920',
  'Chinese-9Y 30': 'CHN930',
  'Chinese-6Y 10': 'CHN610',
  'Chinese-6Y 20': 'CHN620',
  'Chinese-6Y 30': 'CHN630',
  'Chinese-3Y 10 (IB)': 'CHN310IB',
  'Chinese-3Y 20 (IB)': 'CHN320IB',
  'Chinese-3Y 30 (IB)': 'CHN330IB',
  'Chinese-3Y 10': 'CHN310',
  'Chinese-3Y 20': 'CHN320',
  'Chinese-3Y 30': 'CHN330',
  'Spanish-3Y 10 (IB)': 'SPA310IB',
  'Spanish-3Y 20 (IB)': 'SPA320IB',
  'Spanish-3Y 30 (IB)': 'SPA330IB',
  'Spanish-3Y 10': 'SPA310',
  'Spanish-3Y 20': 'SPA320',
  'Spanish-3Y 30': 'SPA330',

  // Arts
  'Art 10 (IB)': 'ART10IB',
  'Art 20 (IB)': 'ART20IB',
  'Art 30 (IB)': 'ART30IB',
  'Art 10': 'ART10',
  'Art 20': 'ART20',
  'Art 30': 'ART30',
  'Drama 10 (IB)': 'DRMA10IB',
  'Drama 20 (IB)': 'DRMA20IB',
  'Drama 30 (IB)': 'DRMA30IB',
  'Drama 10': 'DRMA10',
  'Drama 20': 'DRMA20',
  'Drama 30': 'DRMA30',
  'Drawing 10': 'DRAW10',
  'Drawing 20': 'DRAW20',
  'Drawing 30': 'DRAW30',
  'Dance 15 (IB)': 'DAN15IB',
  'Dance 25 (IB)': 'DAN25IB',
  'Dance 35 (IB)': 'DAN35IB',
  'Dance 15': 'DAN15',
  'Dance 25': 'DAN25',
  'Dance 35': 'DAN35',
  'General Music 10': 'GM10IB',
  'Instrumental Music 20 (IB)': 'BAND20IB',
  'Instrumental Music 30 (IB)': 'BAND30IB',
  'Instrumental Music 10': 'BAND10',
  'Instrumental Music 20': 'BAND20',
  'Instrumental Music 30': 'BAND30',
  'Film Studies 15 (IB)': 'FIS15IB',
  'Film Studies 25 (IB)': 'FIS25IB',
  'Film Studies 35 (IB)': 'FIS35IB',
  'Film Studies 15': 'FIS15',
  'Film Studies 25': 'FIS25',
  'Film Studies 35': 'FIS35',
  'Guitar 15': 'GUI15',
  'Guitar 25': 'GUI25',
  'Guitar 35': 'GUI35',
  'Drumline 15': 'DRUM15',
  'Drumline 25': 'DRUM25',
  'Drumline 35': 'DRUM35',
  'Digital Music 15': 'DMSC15',
  'Digital Music 25': 'DMSC25',
  'Digital Music 35': 'DMSC35',
  'Improv Theatre 15': 'IMPT15',
  'Improv Theatre 25': 'IMPT25',
  'Improv Theatre 35': 'IMPT35',
  'Instrumental Jazz 15': 'JAZZ15',
  'Instrumental Jazz 25': 'JAZZ25',
  'Instrumental Jazz 35': 'JAZZ35',
  'Musical Theatre 15': 'MUST15',
  'Musical Theatre 25': 'MUST25',
  'Musical Theatre 35': 'MUST35',
  'Technical Theatre 15': 'TECT15',
  'Technical Theatre 25': 'TECT25',
  'Technical Theatre 35': 'TECT35',

  // CTS
  'Construction 10': 'CSTR10',
  'Construction 20': 'CSTR20',
  'Construction 30': 'CSTR30',
  'Fashion 10': 'FSHN10',
  'Fashion 20': 'FSHN20',
  'Fashion 30': 'FSHN30',
  'Foods 10': 'FOOD10',
  'Foods 20': 'FOOD20',
  'Foods 30': 'FOOD30',
  'Digital Media 10': 'DMED10',
  'Graphic Design 20': 'GRAD20',
  'Graphic Design 30': 'GRAD30',
  'Photography 20': 'PHO20',
  'Photography 30': 'PHO30',
  'Robotics 10': 'ROB10',
  'Robotics 20': 'ROB20',
  'Robotics 30': 'ROB30',
  // CALM and Phys Ed
  'Career & Life Management Program': 'CALM20',
  'Introductory Team Leadership': 'LD15',
  'Intermediate Team Leadership': 'LD25',
  'Advanced Team Leadership': 'LD35',
  'Physical Education 10': 'PE10',
  'Physical Education 20': 'PE20',
  'Physical Education 30': 'PE30',
  'Soccer Physical Education 10': 'SPE10',
  'Soccer Physical Education 20': 'SPE20',
  'Soccer Physical Education 30': 'SPE30',
};

const PERIODS: { [index: string]: number } = {
  '8:25 AM - 9:55 AM': 1,
  '10:00 AM - 11:30 AM': 2,
  '12:15 PM - 1:45 PM': 3,
  '1:50 PM - 3:20 PM': 4,
  '3:25 PM - 4:55 PM': 5,
};

const DAYPERIOD2BLOCK_OLD: { [index: number]: number[] } = {
  1: [1, 3, 6, 8],
  2: [2, 4, 7, 9, 11],
  3: [1, 5, 6, 10, 12],
  4: [2, 3, 7, 8, 11],
  5: [4, 5, 9, 10],
};

const DAYPERIOD2BLOCK: { [index: number]: number[] } = {
  1: [1, 3, 6, 8],
  2: [2, 5, 7, 9],
  3: [1, 4, 6, 10],
  4: [2, 3, 8, 9],
  5: [4, 5, 7, 10],
};

const NUMBLOCKS = 10;

function getCourseCode(subject: string): string {
  return SUBJKEY[subject] || 'EDGE';
}

function getPeriodFromTimeString(timeString: string): number {
  return PERIODS[timeString] || -1;
}

function getBlockFromPeriod(day: number, period: number): number {
  const d = DAYPERIOD2BLOCK[day];
  if (d === undefined) {
    throw new Error(`Invalid day ${day}`);
  }
  const b = d[period - 1];
  if (b === undefined) {
    throw new Error(`Invalid period ${period} for day ${day}`);
  }
  return b;
}

function getNumBlocks(): number {
  return NUMBLOCKS;
}

function durationTextToSemesterNumber(durationText: string): number {
  // TODO: implement this
  return 0;
}

export {
  durationTextToSemesterNumber,
  getBlockFromPeriod,
  getCourseCode,
  getNumBlocks,
  getPeriodFromTimeString,
  SUBJKEY,
};
