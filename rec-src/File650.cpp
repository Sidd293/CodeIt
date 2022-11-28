/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include <bits//stdc++.h>

using namespace std;

void give(string s , int i)
{
    if(i==s.size())
    {cout<<s<<endl;
    return ;}
    
    give(s,i+1);
    char d = s[i];
    s[i] = '1';
    give(s,i+1);
    s[i] = d;
}
void give_A(string s , int i,int c)
{
    if(i==s.size()){
        string tmps = "";
        int it = s.size()-1;
        // cout<<s;
        while(it >=0)
        {
            cout<<s[it];
            // tmps[]
            if(isdigit(s[it]))
          while(it>=0 && isdigit(s[it])){it--;}
        //   cout<<s[it];
           else
            it--;
        }
        // cout<<s[it];
      
    // cout<<s<<endl;
    cout<<endl;
    return ;
}

  
    give_A(s,i+1,0);
    // s[i] = '1';
      string tmp = s; 
    if(c == 1)
{  
   // cout<<s[i-1]<<" "<<s[i];
//   s.pop_back();
char k = s[i-1];
    // s.erase(s.begin()+i-1);
    s[i] = '1'+(k-'0');
    // int k = i;
   // while(k<s.size()-1)
    //{
      //  s[i]=s[i+1];
    //}
    // s.pop();
    // s.push_back('1'+(s[i-1]-'0'));
  //  cout<<" "<<s[i-1]<<" "<<s[i]<<endl;
}
    else s[i] = '1';
        
    give_A(s,i+1,1);
    s = tmp;
}



int main()
{
    string s = "ABC";
    
    // give(s,0);
give_A(s,0,0);
s[0] = '1';
// give_A(s,1,1);

    return 0;
}