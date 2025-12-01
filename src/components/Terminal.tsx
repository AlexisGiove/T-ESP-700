import { useState, useEffect, useRef } from 'react'
import { TerminalLine, CommandHandler } from '../types'

const Terminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Logo ASCII art - Version détaillée avec motifs de circuit
  const getLogo = () => [
    '',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡅⠀⠀⠀⠀⠀⠀⠀⡄⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⣰⠀⠀⠆⠀⠀⢀⠌⡄⡌⠁⠀⠀⠠⠁⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠚⡔⢣⠀⡰⢀⡀⠴⣡⠚⠠⠀⠀⢀⡐⠃⠀⢀⡄⠎⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⢰⠸⡤⠋⡠⢧⠹⡔⢫⠜⣱⢂⡭⢄⠲⣌⢣⠜⡰⡘⢦⢈⡀⠄⠒⠀⠀⠀⠀⠀⠀⡀⠄⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⢀⠀⠀⠀⢀⠠⣐⠎⡜⡈⡱⡘⡕⡱⢌⠳⣌⠧⢪⠑⠮⠔⠎⠳⡜⣬⠚⣥⡙⢆⡣⢜⢣⠒⣆⠲⡐⢆⢣⠃⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢑⠦⡠⢄⠤⣀⢖⡰⣊⠬⡓⣌⠦⣈⠲⣡⠃⠜⠂⢉⠠⠀⠄⠂⠄⢂⠐⡀⠂⠄⢀⠉⡐⠪⠱⣌⢣⢎⡹⣐⠣⡝⣠⢀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠑⢎⠲⡡⢎⠴⣡⠣⣕⠪⠜⠀⡁⠀⠄⠂⠌⡀⠂⠡⢈⠐⠈⡀⠂⠄⠁⢂⠀⠂⠄⠂⡁⠀⡉⠂⠵⣈⠳⣘⠤⣋⢜⡡⢆⣀⣀⢂⡔⠲⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠐⠢⠔⢲⡐⠮⣌⢣⡑⢎⡲⠅⠃⠠⢀⠂⡐⠠⠁⠌⠐⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠈⠐⢀⠂⠄⠁⠐⡈⠄⡈⠑⢬⡑⠪⡆⣙⠆⠶⣈⠒⣈⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⣐⠣⡜⢣⠜⣢⠙⠈⡀⠐⡈⠐⡀⠂⠄⠁⠀⠀⠀⠀⠀⠂⠁⠀⠂⠁⠀⠀⠀⠂⠀⠀⠀⠀⠀⠌⠠⢁⠠⠀⠐⠈⡀⠘⢅⠎⡰⢌⠥⠡⠓⢆⣒⠲⠌⠃⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠠⢀⡀⣀⢀⡀⡥⢰⣉⠦⡙⣌⢣⠚⠀⠠⠁⠄⠡⢀⠡⠐⠀⠀⠀⠀⠀⠀⠈⣀⢠⡔⠤⠀⠀⠀⠈⠀⡀⠀⠁⠀⠄⠀⠀⠀⠂⠠⠁⠌⠀⠀⡀⠀⠉⡖⢢⡙⢤⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠀⢉⡐⡣⢜⢢⡙⡄⠃⠁⠌⠠⠁⡌⢐⠠⠂⠀⠀⠠⠀⠁⠀⡀⠀⠀⠉⠃⠀⠀⡀⢀⠂⠁⠀⠈⠀⠠⠀⠐⠈⠀⠀⠁⡈⠐⡈⠄⠀⢂⠐⠈⢣⠜⣢⢙⠢⢄⡀⠄⠀⠀⠀⣀⠠⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⢁⡔⢎⠲⣉⠎⠂⠁⠠⡀⢁⡈⠤⠑⡠⠊⡄⠁⠂⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠂⠀⠀⠠⠐⠈⠀⠂⠀⠀⡀⠀⠀⠀⠀⠠⠁⠄⠂⡁⠀⠌⠐⡀⠳⢄⢋⠖⡠⣘⡈⠣⠙⠂⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢁⠠⠊⢠⡘⣌⠳⠀⢠⠈⠄⢁⠐⡄⠢⢌⠱⡠⢃⠄⠀⠀⠀⠈⠀⢀⠀⠀⠀⠀⠂⠀⠀⡀⠀⠂⠀⠀⠀⠀⠀⠀⠀⡀⠄⠀⠀⡡⢈⠀⠠⠈⠄⠀⠐⡀⠫⢄⢫⠔⣡⠆⡄⠁⠁⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠠⠀⡀⡍⢦⠱⡌⠁⡈⠄⢈⠐⡄⠣⡔⢡⢊⡥⣓⢎⠀⠀⠀⢀⠀⠄⠀⢀⠈⠀⠁⠀⠀⠄⠀⠀⠀⡀⠈⠀⠀⡀⠁⢀⠀⠁⠀⠀⠀⠀⠰⢡⠈⡄⠁⠂⠄⠂⠠⠀⣋⠦⡙⡔⢪⠔⡢⢄⡀⣀⢀⡀⠄⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠁⠤⠒⢭⠒⡍⠆⠃⠠⠀⠐⢀⠢⢁⠨⡑⡩⢆⣏⠲⡍⡞⠀⠀⠀⠀⠀⢀⠠⠀⠀⠌⠀⠀⠀⡀⠀⠠⠀⠀⠀⠄⢁⣀⠀⠀⠀⠂⠀⠁⠀⠀⣳⢢⢅⡘⠤⠈⠐⡈⠄⠁⢀⠎⡱⢜⡡⠊⠑⠒⠘⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⠐⡠⢔⢪⠑⡈⠐⠌⠠⠁⠐⠠⡐⠌⡂⡼⣱⢫⡜⣣⠝⡼⡀⠀⠠⠀⠈⠀⠀⠠⠀⠀⠁⠀⠀⠀⠀⠄⠀⠐⠀⡐⠀⠀⠐⠀⠀⠀⠀⠀⡐⠀⡭⣕⠺⣜⢢⠁⡂⠀⠂⠄⡂⢖⠨⡐⠡⠋⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠠⢁⠂⡔⢪⠔⠉⠤⡘⠤⢁⠘⡀⢀⠈⠥⡐⠡⢘⡱⢣⠳⡜⢥⢫⡕⢣⠀⠀⡀⠄⠐⠀⠀⠀⠀⠀⢀⠲⠄⠤⠠⢄⠰⢀⠐⠌⠁⠠⢀⠀⠀⠂⠀⠀⢰⡱⢎⡝⢮⢣⢇⠄⡀⢁⠤⠉⠢⡑⢬⢡⠡⣄⠠⣁⢀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠌⡐⠀⠎⢌⠡⢌⡘⡡⠜⡰⠡⡐⠰⠀⢂⠑⡈⢅⠨⣕⢫⣓⡹⢎⡣⢞⡱⣂⠐⠀⡀⠀⠀⠀⡀⠀⠁⠆⠀⠌⢘⠀⢃⠂⠎⠀⠄⠀⠀⠀⠀⠀⢀⠀⢀⠶⣙⠮⣜⣣⠯⣜⠠⢀⢃⡌⡲⢍⠭⣰⣃⠳⠌⠳⠄⠆⠜⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠌⠀⠀⠤⣉⠦⣑⠪⡔⣡⢣⡑⢣⠱⣡⢋⡔⡢⢄⡒⠄⢩⠖⣥⢛⡬⢳⣍⢳⢭⣆⡐⠀⠐⠀⠐⠀⠀⠀⡀⠀⠀⠄⠈⠀⠅⡐⠈⠀⠀⠁⠀⠠⠀⠂⣠⢋⡞⣥⢛⡴⢣⡝⠢⣠⢒⠵⣊⡥⢖⡭⢤⣀⡀⠂⠁⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠐⠀⡈⠀⢂⡀⠄⢁⠓⡨⠄⢣⡘⠥⠓⠦⠳⠸⠡⢏⡜⡲⣄⠛⡴⣋⣜⢣⢎⢧⡛⡼⡰⣄⠀⠤⠁⠀⢀⠀⠀⠀⠀⠀⠀⠐⠀⠐⠄⠀⠄⢀⠌⠀⢀⡴⣃⠯⡜⢦⢫⡜⢣⣊⡞⢴⡋⠞⠁⣀⠢⢀⠌⠁⠈⠂⠄⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠈⢀⠀⠐⠀⠀⠍⠂⠘⠀⠐⠂⠘⠤⣁⢂⠡⢆⠳⡐⠎⣑⠪⢛⣦⢕⡮⣙⢎⠮⣕⢣⡽⢢⠳⣄⣀⠀⠀⠠⠁⠈⠀⠀⠀⡄⠐⠀⠐⠡⠈⢂⡤⣊⠷⡸⢥⡛⣜⢧⣳⡝⣯⢷⣙⡫⠖⠞⠤⠆⣅⠂⠀⠠⠁⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠂⠐⠠⠀⠀⡀⠌⠀⠅⠢⢑⠦⣉⠧⢬⡑⠫⡷⣮⣗⣮⢳⣜⢫⡝⢦⣋⢾⡱⢆⡤⣄⣁⣀⣈⡐⢬⠤⣔⡲⢭⢳⡼⣡⢟⡹⣖⡽⣞⢧⣳⢫⠓⠦⡛⠍⡑⠨⠐⡄⠂⡌⠑⠠⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠠⠐⠀⠠⠀⡀⠀⠀⠄⠂⠥⠀⢊⡐⠭⡒⠭⣓⠬⣝⢾⣿⣿⣞⡷⣚⣧⣹⢶⣙⢮⡵⣚⢦⡳⢎⡵⣫⢞⡼⣱⣏⣷⣺⣽⣾⢿⣭⢷⣛⡚⠐⠣⠍⡒⠡⠘⡠⢁⠢⠸⡷⠌⢠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠠⠥⠀⠀⠈⠀⠀⠀⡁⠂⠔⣂⠈⡑⢎⡳⢣⠟⣰⢒⢦⡝⣿⠾⣿⣿⡿⣿⣿⡿⣿⢿⣿⡿⣿⣿⣿⣿⠿⠿⣛⢯⢣⠳⡜⢆⢦⡹⣙⠒⠦⢤⣁⠤⡰⢀⠣⡑⢠⠈⢂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠐⠈⠐⠄⡊⠄⠑⠢⢄⢂⠱⣄⢫⢄⠏⡼⣡⢏⠶⣩⡗⣻⢼⣿⣝⡳⣎⢿⣹⡛⣯⡝⣎⢣⢲⡣⢍⠜⢢⠝⢪⡑⢭⠚⣤⢓⡬⣙⣪⡶⣌⠇⠡⢊⠀⡔⡡⢊⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡈⢒⠤⡠⠜⡄⢆⣣⠘⡜⢲⢱⣊⠳⣥⢋⠷⣿⣷⢫⣷⣽⡾⣥⢛⡴⡹⣌⠇⣣⠱⣋⠖⡥⢛⠴⣈⠢⡋⡴⢃⠒⠥⠎⡑⢄⢲⡑⢃⠰⠌⠡⠀⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠧⡑⠫⣜⣃⣼⣸⡜⣣⠦⣉⠳⡌⡍⢞⡹⣌⠳⣌⢳⡙⠶⡩⢖⡱⢪⡙⡤⢣⡜⢮⡱⢫⡜⡡⠏⠐⢄⠂⡅⢒⠨⠰⡌⣔⢫⠣⡑⠠⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡁⢎⠴⣊⢳⡘⠥⢎⠥⡓⡜⡸⢜⢢⠇⡏⢖⡣⢞⡱⢍⠶⡡⢇⢣⢳⡡⢾⣟⡱⠣⢈⠔⡨⢑⠠⠀⡘⢄⠣⠑⡌⡐⢂⠡⢀⠁⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡌⢲⠡⢆⡹⡘⢤⢃⡜⠰⣁⠊⠦⠙⡜⢬⠒⡥⢊⢇⠮⣑⢎⢣⠣⡝⡲⠬⣁⠶⣁⠸⠀⠁⠢⡘⠌⢂⠅⠠⡀⠅⢂⠐⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠘⢤⢋⠦⡱⣉⢆⠣⡜⡱⢂⠡⠌⠓⣌⢣⡙⡤⢍⢎⠶⣩⠎⣡⠣⠱⡁⢾⠯⠀⡍⠢⢀⠂⠅⡐⠠⠂⠌⡁⠐⡈⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢂⠇⣎⠱⡌⢎⡱⢜⡡⢋⠦⡙⠦⢌⠲⣡⡙⣬⢚⡻⣷⡛⢤⠃⢃⠱⢀⢂⠒⡈⢁⠂⠌⡐⠠⠁⠌⡐⠠⠁⠀⠀⠀⠀⠀⠐⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢎⡔⢣⠜⡢⢕⠪⡜⡱⢊⠵⣉⢎⡱⢢⢱⢂⠯⡜⢆⠭⢒⡉⢄⠎⡄⢂⠐⠄⠂⠌⡐⠠⠁⠌⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⢊⠴⡘⡌⢎⡱⢊⡱⢌⡱⣉⠖⡡⢎⡔⢣⠎⠌⠐⠔⡄⠚⢠⠉⡌⠠⠐⠠⠈⠄⡁⢂⠐⠠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⢆⡱⡘⢦⢡⠣⡜⢢⠱⣌⠪⠱⡌⡜⡡⠎⢐⠂⢢⠐⢁⠀⠆⡐⠠⢁⠂⡁⢂⠐⠠⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⢐⢢⢉⣆⢣⠓⣌⢣⠓⣤⢋⣵⢘⣄⡃⢠⢁⠊⡔⢠⡈⠀⡄⡐⢀⠂⡐⢀⠂⡌⢀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⠤⡘⠜⣌⠻⡩⠈⡘⢡⠛⡼⣈⡜⠁⢀⠌⠛⠀⡄⢃⠘⠠⠁⠌⠠⠁⠌⠘⢀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠘⡐⠠⢃⠅⠣⠄⠠⡙⠤⢣⠜⠀⠊⠄⠠⠡⠐⠠⠈⠄⠡⠈⠄⠁⢂⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆⠱⣀⠀⠃⡌⠱⠈⡡⠄⢃⠌⡒⠤⠁⠠⠑⠠⢁⠂⠡⠈⠄⠁⠌⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡉⠄⠒⡤⢂⠁⠄⡡⠒⠠⠈⠄⢂⠘⡐⠀⠁⠌⡐⠠⠈⠄⠡⠐⠈⢀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⠒⠠⠌⢢⠐⠀⢁⠂⠡⠈⠄⠂⠄⡀⠛⠀⠀⠄⡁⠂⠄⠂⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠤⠑⠂⡅⢂⠠⠈⠄⠡⢈⠐⠠⠐⠀⡀⠐⠠⠀⠐⠀⡀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⠰⢀⠡⠘⡄⢂⠁⢈⠐⠀⠠⠁⠠⠁⠠⠈⠀⠀⠁⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢂⠐⢂⠡⠘⡀⠀⠠⠐⠈⢀⠂⠁⡀⠁⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠌⡀⢂⠡⠐⠈⠁⠀⠠⠀⠀⠂⠀⠠⠐⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠠⠐⡀⠐⠈⠠⠐⠀⠁⠐⣠⠀⠀⠀⠀⡀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠠⠀⠡⠀⠁⡀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⡁⢂⠀⠠⠐⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠠⠐⠀⡈⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠠⠁⠀⠄⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠈⠀⢀⠐⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⡀⠁⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⡀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '',
    '      █████╗ ██████╗  ███████╗ ██████╗ ███████╗',
    '      ██╔══██╗██╔══██╗██╔════╝ ██╔═══██╗██╔════╝',
    '      ███████║██████╔╝██║  ███╗██║   ██║███████╗',
    '      ██╔══██║██╔══██╗██║   ██║██║   ██║╚════██║',
    '      ██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████║',
    '      ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝',
    '',
    '         Analyse Prédictive par IA',
    '            Open Source Project',


    
    '',
  ]

  // Commandes disponibles
  const commands: Record<string, CommandHandler> = {
    help: () => [
      'Commandes disponibles:',
      '',
      '  help       - Affiche cette liste de commandes',
      '  logo       - Affiche le logo ARGOS',
      '  summary    - Résumé du projet',
      '  ideation   - Opportunité et problème adressé',
      '  pbs        - Structure de découpage produit (PBS)',
      '  functions  - Description des fonctions haut niveau',
      '  about      - Informations sur ARGOS',
      '  usecases   - Cas d\'usage de la plateforme',
      '  ethics     - Charte éthique',
      '  innovation - Originalité et innovation du projet',
      '  team       - Équipe et recrutement',
      '  roadmap    - Feuille de route du projet',
      '  contact    - Informations de contact',
      '  clear      - Efface l\'historique du terminal',
    ],
    logo: () => getLogo(),
    summary: () => [
      'Résumé ARGOS:',
      '',
      'ARGOS est une plateforme open-source d\'analyse prédictive par IA',
      'qui agrège des données publiques pour détecter des signaux faibles',
      'et anticiper des crises. Notre objectif : comprendre des tendances',
      'globales, pas surveiller des individus. Un défi technique à la',
      'hauteur d\'une équipe de 7 sur 4 semestres.',
    ],
    ideation: () => [
      'Ideation ARGOS - Opportunité et Problème',
      '',
      'PROBLÈME:',
      '  Les décideurs manquent d\'outils pour anticiper les crises',
      '  (ruptures de stock, cyberattaques, pics de trafic) en analysant',
      '  les signaux faibles dispersés dans des milliards de données.',
      '',
      'OPPORTUNITÉ:',
      '  L\'IA et le Big Data permettent aujourd\'hui d\'analyser en temps',
      '  réel des données publiques pour détecter des patterns prédictifs',
      '  et anticiper des événements critiques.',
      '',
      'SOLUTION:',
      '  ARGOS agrège des données publiques et anonymisées pour offrir',
      '  une plateforme transparente et éthique d\'aide à la décision.',
    ],
    pbs: () => [
      'Product Breakdown Structure (PBS) ARGOS',
      '',
      '1. Gestion des données',
      '   1.1 Collecte de données publiques',
      '   1.2 Anonymisation et traitement',
      '   1.3 Stockage et indexation',
      '',
      '2. Intelligence Artificielle',
      '   2.1 Modèles de Machine Learning',
      '   2.2 NLP et analyse de texte',
      '   2.3 Détection de signaux faibles',
      '',
      '3. Infrastructure',
      '   3.1 Backend et APIs',
      '   3.2 Pipelines de données (Big Data)',
      '   3.3 Cybersécurité et protection',
      '',
      '4. Interface utilisateur',
      '   4.1 Terminal de supervision',
      '   4.2 Visualisations avancées',
      '   4.3 Tableaux de bord prédictifs',
      '',
      '5. Éthique et transparence',
      '   5.1 Charte éthique',
      '   5.2 Documentation open-source',
      '   5.3 Audit et conformité',
    ],
    functions: () => [
      'Fonctions Haut Niveau ARGOS',
      '',
      'F1. Agrégation de données',
      '    Collecte et traitement de données publiques en temps réel',
      '    (actualités, réseaux sociaux, open data).',
      '',
      'F2. Analyse prédictive',
      '    Détection de signaux faibles via IA et Machine Learning',
      '    pour anticiper des événements critiques.',
      '',
      'F3. Visualisation',
      '    Interface terminal et tableaux de bord pour présenter',
      '    les insights et tendances détectées.',
      '',
      'F4. Gestion éthique',
      '    Respect strict de la charte éthique : données publiques',
      '    uniquement, anonymisation, transparence open-source.',
      '',
      'F5. Aide à la décision',
      '    Fourniture d\'alertes et recommandations pour anticiper',
      '    des crises et optimiser les décisions.',
    ],
    innovation: () => [
      'Innovation ARGOS - Originalité du Projet',
      '',
      'ARGOS se distingue par:',
      '',
      '✓ Approche éthique proactive',
      '  Charte éthique stricte dès la phase 1, engagement sur',
      '  la transparence et le respect de la vie privée.',
      '',
      '✓ Focus sur les signaux faibles',
      '  Détection de patterns subtils dans des données publiques',
      '  pour anticiper des événements avant qu\'ils ne deviennent',
      '  des crises.',
      '',
      '✓ Open-source et transparent',
      '  Code source ouvert pour garantir la transparence totale',
      '  des algorithmes et traitements.',
      '',
      '✓ Cas d\'usage concrets et positifs',
      '  Applications pratiques pour l\'industrie, la cybersécurité',
      '  et les transports, pas de surveillance individuelle.',
      '',
      'ARGOS n\'est pas une simple mise à jour d\'un projet existant,',
      'mais une approche originale combinant IA, éthique et transparence.',
    ],
    about: () => [
      'ARGOS - Analyse Prédictive par IA',
      '',
      'Chaque jour, des milliards de données sont créées.',
      'Et si nous pouvions y lire l\'avenir ?',
      '',
      'ARGOS est une plateforme open-source d\'analyse prédictive',
      'qui agrège en temps réel des données publiques et anonymisées',
      'pour détecter des signaux faibles et anticiper des événements critiques.',
      '',
      'Notre objectif n\'est pas de surveiller des personnes,',
      'mais de comprendre des tendances globales pour anticiper des crises.',
      '',
      'L\'objectif : offrir un outil transparent, éthique et utile',
      'pour l\'aide à la décision.',
    ],
    usecases: () => [
      'Cas d\'usage ARGOS - Applications concrètes et positives:',
      '',
      '1. Anticipation de rupture de stock',
      '   Anticiper une rupture de stock sur des composants électroniques',
      '   en analysant l\'actualité des usines et des transports.',
      '',
      '2. Détection d\'émergence de cyberattaques',
      '   Détecter l\'émergence d\'une cyberattaque en corrélant',
      '   des discussions sur des forums spécialisés et des',
      '   publications techniques.',
      '',
      '3. Prévision de pic de trafic',
      '   Prévoir un pic de trafic sur un réseau de transport',
      '   en analysant des annonces d\'événements publics.',
      '',
      '4. Analyse de tendances économiques',
      '   Identifier des signaux faibles dans les secteurs économiques',
      '   grâce à l\'agrégation de données open data.',
    ],
    ethics: () => [
      'Charte Éthique ARGOS - Notre Engagement',
      '',
      'La première phase de notre projet sera de rédiger une',
      'charte éthique stricte. Nous nous engageons à n\'utiliser',
      'exclusivement que des données publiques et anonymisées.',
      '',
      '✓ Données publiques uniquement',
      '  Aucune collecte de données privées ou confidentielles.',
      '',
      '✓ Aucune donnée personnelle nominative',
      '  Respect strict de l\'anonymisation et de la vie privée.',
      '',
      '✓ Code open-source',
      '  Notre code sera open-source pour garantir une transparence',
      '  totale sur les algorithmes et traitements.',
      '',
      '✓ Objectif : aide à la décision',
      '  ARGOS est un outil d\'analyse prédictive, pas un système',
      '  de surveillance individuelle.',
    ],
    team: () => [
      'Appel à Talents ARGOS',
      '',
      'Nous recherchons des passionnés d\'IA, de data science,',
      'de développement back-end et de cybersécurité pour construire',
      'le futur de l\'analyse prédictive.',
      '',
      'Le Défi Technique:',
      '  • Big Data et traitement de flux',
      '  • Intelligence Artificielle et Machine Learning',
      '  • NLP (Natural Language Processing) et analyse de texte',
      '  • Cybersécurité et protection des données',
      '  • Visualisation avancée de données',
      '',
      'Un défi à la hauteur d\'une équipe de 7 sur 4 semestres.',
    ],
    roadmap: () => [
      'Roadmap ARGOS (4 semestres - Équipe de 7)',
      '',
      'S7 - Semestre 1:',
      '  • Rédaction de la charte éthique stricte',
      '  • Ideation et définition du périmètre',
      '  • Architecture technique',
      '  • Prototypage des premiers modules',
      '',
      'S8 - Semestre 2:',
      '  • Développement des pipelines de données',
      '  • Implémentation des modèles ML et IA',
      '  • NLP et analyse de texte',
      '  • Interface utilisateur v1',
      '',
      'S9 - Semestre 3:',
      '  • Optimisation et scalabilité (Big Data)',
      '  • Cybersécurité et protection des données',
      '  • Tests et validation',
      '  • Documentation complète',
      '',
      'S10 - Semestre 4:',
      '  • Déploiement et monitoring',
      '  • KPIs et métriques de performance',
      '  • Open source release',
    ],
    contact: () => [
      'Contact ARGOS',
      '',
      'GitHub:    https://github.com/argos-project',
      'Notion:    https://argos.notion.site',
      '',
      'Rejoindre le projet:',
      '  → Envoyez un email à: contact@argos-project.org',
      '  → Ou remplissez le formulaire sur notre Notion',
    ],
    clear: () => {
      setHistory([])
      return ['Terminal effacé.']
    },
  }

  // Messages de démarrage avec animation typewriter
  useEffect(() => {
    let isMounted = true
    const timeoutIds: number[] = []

    // Afficher le logo en premier
    const logoLines = getLogo()
    logoLines.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        if (isMounted) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', content: line, timestamp: Date.now() },
          ])
        }
      }, index * 50) // Animation rapide ligne par ligne
      timeoutIds.push(timeoutId)
    })

    // Messages de boot après le logo
    const bootMessages = [
      { content: '', delay: logoLines.length * 50 + 200 }, // Ligne vide après le logo
      { content: 'Booting ARGOS predictive core...', delay: logoLines.length * 50 + 500 },
      { content: 'Loading public data streams...', delay: logoLines.length * 50 + 1000 },
      { content: 'Initializing AI models...', delay: logoLines.length * 50 + 1500 },
      { content: 'System ready. Type "help" for available commands.', delay: logoLines.length * 50 + 2000 },
    ]

    bootMessages.forEach((msg, index) => {
      const timeoutId = window.setTimeout(() => {
        if (isMounted && msg.content) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', content: msg.content, timestamp: Date.now() },
          ])
        }
        if (isMounted && index === bootMessages.length - 1) {
          setIsTyping(false)
        }
      }, msg.delay)
      timeoutIds.push(timeoutId)
    })

    return () => {
      isMounted = false
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [])

  // Focus sur l'input au chargement
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTyping])

  // Scroll automatique vers le bas
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Gestion de la soumission de commande
  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return

    const [command, ...args] = cmd.trim().toLowerCase().split(' ')

    // Ajouter la commande à l'historique des commandes
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Ajouter la commande à l'historique
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: `argos> ${cmd}`, timestamp: Date.now() },
    ])

    // Exécuter la commande
    const handler = commands[command]
    if (handler) {
      const output = handler(args)
      const outputLines = Array.isArray(output) ? output : [output]
      outputLines.forEach((line) => {
        // Ajouter chaque ligne de sortie
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: line, timestamp: Date.now() },
        ])
      })
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          content: 'Commande inconnue. Tapez "help" pour la liste des commandes disponibles.',
          timestamp: Date.now(),
        },
      ])
    }

    setCurrentInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isTyping) {
      handleCommand(currentInput)
    }
  }

  const handleQuickCommand = (cmd: string) => {
    if (!isTyping) {
      handleCommand(cmd)
    }
  }

  // Navigation dans l'historique avec les flèches
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  // Rendu d'une ligne du terminal
  const renderLine = (line: TerminalLine, index: number) => {
    const isCommand = line.type === 'command'
    const isSystem = line.type === 'system'
    const colorClass = isCommand
      ? 'text-argos-neon'
      : isSystem
      ? 'text-argos-turquoise'
      : 'text-gray-300'

    // Gérer les lignes vides - sans hauteur fixe pour éviter les traits
    if (!line.content || line.content.trim() === '') {
      return <div key={index} className="h-0 leading-none"></div>
    }

    // Détection du logo ASCII (caractères Braille ou lignes très longues au début)
    const isBrailleLine = line.content && /[⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿]/.test(line.content)
    const isArgosLogo = line.content && /[█╗╔═║╚╝]/.test(line.content)
    const isVeryLongLine = line.content && line.content.length > 100
    const isLogoLine = isSystem && (isBrailleLine || isArgosLogo || isVeryLongLine)
    
    // Tailles de police adaptatives pour le logo - très petit sur mobile pour s'adapter
    const logoFontSize = isLogoLine 
      ? 'text-[6px] sm:text-[7px] md:text-[9px] lg:text-[10px] xl:text-xs'
      : 'text-[10px] sm:text-xs md:text-sm'
    
    return (
      <div 
        key={index} 
        className={`font-mono-terminal ${logoFontSize} ${colorClass} ${isLogoLine ? 'whitespace-pre leading-[1.2] sm:leading-[1.3] md:leading-normal' : 'break-words whitespace-pre-wrap'} animate-fadeIn ${isLogoLine ? 'logo-ascii-line' : ''}`}
        style={{
          animation: 'fadeIn 0.3s ease-in',
          maxWidth: '100%',
          overflowX: 'hidden',
          overflowY: 'visible',
          lineHeight: isLogoLine ? '1.1' : 'normal',
        }}
      >
        {line.content}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Titre du terminal */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-argos-neon font-mono-terminal drop-shadow-[0_0_8px_rgba(96,245,194,0.5)]">
          ARGOS://terminal
        </h2>
        <div className="mt-2 h-0.5 w-16 sm:w-24 mx-auto bg-gradient-to-r from-transparent via-argos-neon to-transparent opacity-50"></div>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        className="bg-argos-dark-secondary border-2 border-argos-border rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 h-[450px] sm:h-[500px] md:h-[600px] overflow-y-auto overflow-x-hidden font-mono-terminal transition-all duration-300"
        style={{
          boxShadow: '0 0 30px rgba(96, 245, 194, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.3)',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Historique */}
        <div className="space-y-0 sm:space-y-0.5 mb-3 sm:mb-4">
          {history.map((line, index) => renderLine(line, index))}
        </div>

        {/* Ligne de commande */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2 mt-2 flex-wrap">
            <span className="text-argos-neon text-[10px] sm:text-xs md:text-sm flex-shrink-0 font-semibold">argos&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-200 font-mono-terminal text-[10px] sm:text-xs md:text-sm placeholder-gray-600"
              placeholder="Tapez une commande..."
              autoFocus
            />
            <span className="text-argos-neon animate-blink text-[10px] sm:text-xs md:text-sm flex-shrink-0">▊</span>
          </form>
        )}
      </div>

      {/* Boutons de commandes rapides */}
      {!isTyping && (
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center px-1 sm:px-2">
          {['help', 'logo', 'summary', 'ideation', 'pbs', 'functions', 'about', 'usecases', 'ethics', 'innovation', 'team', 'roadmap', 'contact', 'clear'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-argos-dark-secondary border border-argos-border rounded text-argos-turquoise hover:bg-argos-border hover:border-argos-neon hover:text-argos-neon transition-all duration-300 hover:scale-105 active:scale-95 font-mono-terminal text-[10px] sm:text-xs md:text-sm shadow-lg hover:shadow-argos-neon/20 touch-manipulation"
              >
                [{cmd}]
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Terminal
